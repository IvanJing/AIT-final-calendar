import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }
});

const Event = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true  
    },
    startTime: String,
    endTime: String,
    id: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Day = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    events: [Event],
    user: String
});

User.plugin(passportLocalMongoose);

export const EventModel = mongoose.model('Event', Event);
export const DayModel = mongoose.model('Day', Day);
export const UserModel = mongoose.model('User', User);