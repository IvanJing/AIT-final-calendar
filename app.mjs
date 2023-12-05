import './src/database/config.mjs';
import express from 'express';
import mongoose from 'mongoose';
import './src/database/models.mjs';
import path from 'path';
import passport from 'passport';
import { Strategy } from 'passport-local';
import crypto from 'crypto';
import session from 'express-session';
import apiRouter from './routes/api.mjs';
import hbs from 'hbs';
import { fileURLToPath } from 'url';
import {EventModel, DayModel, UserModel} from './src/database/models.mjs';

const app = express();
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
let userid = null;
app.use(express.static('public'));
app.use(express.static('scripts'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

//Set up handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

mongoose.connect(process.env.DSN);
mongoose.connection.on('connected', () => {
	console.log('Connected to MongoDB');
});

app.use('/public', express.static('public', { 'extensions': ['css'] }));

//Set up session
const sessionSecret = crypto.randomBytes(64).toString('hex');
app.use(session({secret:sessionSecret, resave: false, saveUninitialized: false}));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/api', apiRouter);

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());
passport.use(new Strategy(UserModel.authenticate()));

export function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


app.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/main');
    }
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/userid', (req, res) => {
    res.type('text').send(userid);
});

app.get('/main', (req, res) => {
    res.render('main');
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', async (err, user) => {
        try {
            if (err) {
                throw err;
            }
            if (!user) {
                return res.render('login', { error: 'Invalid username or password' });
            }
            await req.login(user, (loginErr) => {
                if (loginErr) {
                    throw loginErr;
                }
                userid = user.username;
                res.redirect('main');
            });
        } catch (error) {
            res.render('login', { error: 'Login failed' });
        }
    })(req, res, next);
});

app.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ username: req.body.username });
        if (existingUser) {
            throw new Error('Username already exists');
        }

        // Create a new user without setting the password explicitly
        const user = new UserModel({ username: req.body.username });
        
        // Use passport-local-mongoose register method
        await UserModel.register(user, req.body.password);

        await req.login(user, (loginErr) => {
            if (loginErr) {
                throw loginErr;
            }
            res.redirect('/main');
        });
    } catch (error) {
        console.error(error);
        res.render('register', { error });
    } 
    
});

app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Listening on port ${process.env.PORT ?? 3000}`);
});

export userid;
