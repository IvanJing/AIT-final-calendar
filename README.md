# Scuffed Calendar

## Overview

What originally started as an attempt at a fitness routine app transformed into a broader-scoped calendar app. 
This app provides users, who login with username and password, the simple ability to create tasks and append them to dates of their choosing.
All forms beyond the initial login/registration pages reside on one page via popups. The user can select a date on the monthly calendar, then an
event that they've created in the past to add said event to the calendar.

The user can change the calendar's color, as well as change the month displayed beyond the current month. 

## Data Model

The program stores Events, Days, and login details for users. Days are composed of simple dates and an array of events, which can be appended to by the
events models. 


An Example User:

```javascript
{
  username: "shannonshopper",
  password: "IloveTreez"
}
```

An Example Event

```javascript
{
  eventName: "Visiting Versoza"
  description: "Not actually"
  startTime: ""
  endTime: ""
  id: "versozafan221"
  user: "treehouseclimber"
}
```

An Example Day

```javascript
{
  date: "9-12-2099"
  events: [NYUGathering, Party@urhouse]
  user: "introvertedSnail"
}
```


## [Link to Commented First Draft Schema](db.mjs) 

## Wireframes


/routine/create - page for creating a new routine

![list create](documentation/routine-create.png)

/calendar - Displays the user's calendar and planned routines

![list](documentation/calendar.png)

/routine/legs - page for showing a specific routine (in this case, legs!)

![list](documentation/routine-legs.png)

/day/edit - A page for users to edit (adding and removing routines) a specific day in their calendar.
![list](documentation/day-edit.png)


## Site map


(documentation/Wireframe.png)

## User Stories or Use Cases

1. As a non-registered register, I can create my own profile with a username and password
2. as a user, I can view all the events I've made
3. as a user, I can create new events of my choosing
4. as a user, I can access my home page, letting me see the schedule I've created for myself.
5. as a user, I can add pre-made events to my schedule.
7. as a user, I can view the calendar as I please



## Research Topics

* (5 points) Integrate user authentication
    * Used Passport for user authentication
    * Storing account information and simplifies the process of authentication methods for the user (this is automatic)
* (2 points) Use Sass as a CSS preprocessor
    * Is a pre-processor, meaning it is a tool that allows for the compilation of CSS code using their own unique syntax.
    * Apparently very organized and easy to learn, making it an efficient tool for editing HTML presentation.
* (3 points) Dotenv
    * Straight forward usage of dotenv



## [Link to Initial Main Project File](app.mjs) 


## Annotations / References Used
* I used an online tutorial to help with some of my calendar logic.
    * https://www.youtube.com/watch?v=m9OSBJaQTlM
* At the moment, I've only really delved into sass to a brief degree.
    * https://sass-lang.com/guide/
* I tried a react tutorial before realizing I didn't have the time to learn it.
    * At least, not to a degree that it would've been worth it.

    


