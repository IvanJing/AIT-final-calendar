/* eslint-disable no-use-before-define */
/*
This file is in charge of all the calendar-related logic.
It will display a dynamic calendar based on the current date.
*/

import Day from '../classes/dayClass.mjs';
let move = 0;
let month = null;
let year = null;
let selectedDate = null;
let deleteMode = false;

const calendar = document.getElementById('calendar');
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/*
    Function to be called each time the calendar needs to be rendered. 
    Grabs current date and calculates the monthly calendar to be shown.
    Will change calendar month based on move variable.
*/
function render() {
    const currentDate = new Date();

    if (move !== 0) {
        currentDate.setMonth(new Date().getMonth() + move);
    }

    const day = currentDate.getDate();
    month = currentDate.getMonth();
    year = currentDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const paddingDays = firstDayOfMonth;

    document.getElementById('monthDisplay').innerText = `${currentDate.toLocaleDateString('en-US', {month: 'long'})} ${year}`;

    calendar.innerHTML = '';

    for (let i = 0; i < paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        //If the day is not a padding day, make day visible on calendar
        if (i > paddingDays) { 
            daySquare.textContent = i - paddingDays;
            daySquare.dataset.Day = daySquare.textContent;
            daySquare.dataset.Date = `${month}-${daySquare.textContent}-${year}`;

            //Tags current Date as today
            if(i - paddingDays === day && move === 0){
                daySquare.classList.add('today');
            }

            //Populates daySquare with events
            populateDay(daySquare);

            daySquare.addEventListener('click', () => {
                //Remove selected tag from all other squares
                document.querySelectorAll('.day').forEach(square => {
                    square.classList.remove('selected');
                });
                daySquare.classList.add('selected');
                selectedDate = `daySquare.dataset.Date`;
            });
        }else{
            daySquare.classList.add('padding');
        }
        calendar.appendChild(daySquare);
    }
}

/*
Function that populates a given daySquare with its events, if they exist.
*/
async function populateDay(daySquare) {
    daySquare.innerHTML = '';
    daySquare.textContent = daySquare.dataset.Day;

    const date = daySquare.dataset.Date;
    const res = await fetch(`/api/day/date:${date}`, { method: 'GET' });
    const day = await res.json();

    if (day.events.length > 0) {
        for (const event of day.events) {
            const eventItem = document.createElement('div');
            eventItem.classList.add('eventItem');
            eventItem.textContent = event.eventName;
            daySquare.appendChild(eventItem);
        }
    }
}

/*
Retrieves recurring events from database, then populates the recurring events menu on the left.
Display's the event's name, but stores the event's id in the element's data-id attribute.
*/
async function populateRecurringEvents() {
    const eventsDisplay = document.getElementById('eventsDisplay');
    eventsDisplay.innerHTML = '';


    const res = await fetch('/api/events', { method: 'GET' });
    const events = await res.json();

    for (const event of events) {
        const recurringEvent = document.createElement('div');

        recurringEvent.classList.add('recurringEvent');
        recurringEvent.textContent = event.eventName;
        recurringEvent.dataset.id = event._id;

        recurringEvent.addEventListener('click', () => {
            if(deleteMode){
                deleteRecurringEvent(recurringEvent.dataset.id);
                deleteMode = false;
                return;
            }
            addRecurringEvent(recurringEvent.dataset.id);
        });


        // Append the list item to the eventsList
        eventsDisplay.appendChild(recurringEvent);
    }
}

/*
    If there's a currently selected day, this function will add the selected recurring event to that day
    by finding the event's information in the database using the div's dataset id and calling the day's addEvent method.
*/

async function addRecurringEvent(eventId){
    if(selectedDate){
        const res = await fetch(`api/events/${eventId}`, {method: 'GET'});
        if(!res.ok){
            throw new Error('Failed to retrieve event');
        }
        const event = await res.json();

        const daySquare = document.querySelector(`.day.selected`);
        console.log(daySquare.dataset.Date);
        const dayInstance = new Day(daySquare.dataset.Date);
        
        dayInstance.addEvent(event.eventName, event.description, event._id, event.startTime, event.endTime, event.user);
        populateDay(daySquare);
    }
}

async function deleteRecurringEvent(eventId){
    const res = await fetch(`api/events/${eventId}`, {method: 'DELETE'});
    if(!res.ok){
        throw new Error('Failed to delete event');
    }
    populateRecurringEvents();
}


//This function will handle the popup for adding recurring events
function showRecurringEventPopup(){
     document.getElementById('recurringEventPopup').classList.add('show');

     //listener that checks if the user clicks outside the popup
     document.addEventListener('click', closeRecurringEventPopupOutside);
}

function hideRecurringEventPopup(){
    document.getElementById('recurringEventPopup').classList.remove('show');

    //remove the listener that checks if the user clicks outside the popup
    document.removeEventListener('click', closeRecurringEventPopupOutside);
}

function closeRecurringEventPopupOutside(e){
    const popup = document.getElementById('recurringEventPopup');

    if(!popup.contains(e.target) && e.target.id !== 'addEventButton'){
        hideRecurringEventPopup();
    }
}

//Functions below handle cusomization popup's functionality
function showCustomizationPopup(){
    document.getElementById('customizationPopup').classList.add('show');

    //listener that checks if the user clicks outside the popup
    document.addEventListener('click', closeCustomizationPopupOutside);
}

function hideCustomizationPopup(){
    document.getElementById('customizationPopup').classList.remove('show');
    
    //remove the listener that checks if the user clicks outside the popup
    document.removeEventListener('click', closeCustomizationPopupOutside);
    }

function closeCustomizationPopupOutside(e){
    const popup = document.getElementById('customizationPopup');

    if(!popup.contains(e.target) && e.target.id !== 'customizeButton'){
        hideCustomizationPopup();
    }
}

function applyBackground(){
    const wallColor = document.getElementById('wallPaperColor').value;
    document.body.style.backgroundColor = wallColor;

    const calendarColor = document.getElementById('calendarColor').value;
    document.getElementById('calendar').style.backgroundColor = calendarColor;

    const textColor = document.getElementById('textColor').value;
    document.body.style.color = textColor;
}
//Sets up all buttons
function buttonSetup(){
    const nextButton = document.getElementById('nextButton');
    const previousButton = document.getElementById('previousButton');
    const addEventButton = document.getElementById('addEventButton');
    const deleteEventButton = document.getElementById('deleteEventButton');
    const saveEventButton = document.getElementById('saveEventButton');
    const customizeButton = document.getElementById('customizeButton');
    const applyBackgroundButton = document.getElementById('applyBackgroundButton');

    nextButton.addEventListener('click', () => {
        move++;
        render();
    });

    previousButton.addEventListener('click', () => {
        move--;
        render();
    });

    addEventButton.addEventListener('click', () => {
        showRecurringEventPopup();
    });

    deleteEventButton.addEventListener('click', () => {
        deleteMode = true;
    });

    saveEventButton.addEventListener('click', () => {
        hideRecurringEventPopup();
    });

    customizeButton.addEventListener('click', () => {
        showCustomizationPopup();
    });
    applyBackgroundButton.addEventListener('click', () => {
        applyBackground();
        hideCustomizationPopup();
    });
}


//Function for addings events

//Need to add display of events
populateRecurringEvents();
buttonSetup();
render();