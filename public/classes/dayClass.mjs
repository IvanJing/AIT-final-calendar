class Day {
    constructor(date, existingDay = null) {
      if (existingDay) {
        this.date = existingDay.date;
        this.events = existingDay.events;
      } else {
        this.date = date;
        this.events = [];
      }
    }
  
    async addEvent(eventName, description, id = null, startTime, endTime, user = null) {
        const newEvent = {
            eventName,
            description,
            id,
            startTime,
            endTime,
            user,
            directlyAdded: true
        };
    
        const existingEventIndex = this.events.findIndex(event => event.id === id);
        
        //Update instead of add if the event already exists.
        if (existingEventIndex !== -1) {
            this.events[existingEventIndex] = newEvent;
        } else {
            // If the event is new, add it to the events array
            this.events.push(newEvent);
        }
    
        await this.save();
    }
  
    async save() {
  
      try {
        const response = await fetch(`/api/day/date:${this.date}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            events: this.events
          })
        });
  
        if (!response.ok) {
          throw new Error('Failed to save day');
        }
      } catch (error) {
        console.error('Error saving day:', error);
      }
    }
  }
  
  export default Day;