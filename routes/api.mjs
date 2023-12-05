import express from 'express';
import {EventModel, DayModel, UserModel} from '../src/database/models.mjs';
import { setCurrentUser } from '../app.mjs';

const router = express.Router();

//Routes for events
router.get('/events', async (req, res) => {
    try{
        const events = await EventModel.find({});
        res.status(200).json(events);
    } catch(err) {
        res.status(500).json({err: 'Internal Server Error'});
    }
});

router.get('/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await EventModel.findById(eventId);

        if (!event) {
            res.status(404).json({ err: 'Event not found' });
        } else {
            res.status(200).json(event);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
});

router.post('/events', setCurrentUser, async (req, res) => {
    const user = res.locals.currentUser;
    try{
        const newEvent= new EventModel({
            eventName: req.body.eventName,
            description: req.body.description,
            startTime: req.body.startTime,
            endTime: req.body.endTime, 
            user: user._id
        });
        await newEvent.save();
        res.redirect('/main');
    } catch(err) {
        console.error(err);
        res.status(500).json({err: 'Internal Server Error'});
    }
});

router.put('/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const updateData = {
            eventName: req.body.eventName,
            description: req.body.description,
            startTime: req.body.startTime,
            endTime: req.body.endTime    
        };

        const eventUpdated = await EventModel.findByIdAndUpdate(eventId, updateData, { new: true });

        if (!eventUpdated) {
            res.status(404).json({ err: 'Event not found' });
        } else {
            res.status(200).json(eventUpdated);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
});

router.delete('/events/:id', async (req, res) => {
    try{
        const eventId = req.params.id;
        const eventDeleted = await EventModel.findByIdAndDelete(eventId);
        if(!eventDeleted) {
            return res.status(404).json({err: 'Event not found'});
        } else{
            return res.status(200).json(eventDeleted);
        }
    } catch (err) {
        res.status(500).json({err: 'Internal Server Error'});
    }
});

//Routes for day
router.get('/day/:date', async (req, res) => {
    try{
        const date = req.params.date;
        const day = await DayModel.findOne({date: date});
        if(!day){
            return res.status(404).json({err: 'Day not found'});
        }

        res.status(200).json(day);
    } catch(err) {
        res.status(500).json({err: 'Internal Server Error'});
    }
});

router.post('/day', async (req, res) => {
    try{
        const { date, events } = req.body;
        const newDay = new DayModel( date, events);
        await newDay.save();
        res.status(201).json(newDay);
    } catch(err) {
        res.status(404).json({err: 'Date not found'});
    }
});

router.post('/day/:date', async (req, res) => {
    const date = req.params.date;
    const eventData = req.body.events; // Adjust this based on your data structure
  
    try {
      // Check if a day with the specified date exists
      const existingDay = await DayModel.findOne({ date });
  
      if (existingDay) {
        // Update the existing day
        existingDay.events = eventData;
        await existingDay.save();
        res.status(200).json(existingDay);
      } else {
        // Create a new day
        const newDay = new DayModel({ date, events: eventData });
        await newDay.save();
        res.status(201).json(newDay);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export {router as default};