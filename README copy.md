The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

(__TODO__: your project name)

# Something Something Fitness Page

## Overview

(__TODO__: a brief one or two paragraph, high-level description of your project)

One of the most common ways people fail their goals in attaining their fitness dreams is an inconsistent schedule. When someoone misses a hastily planned workout session, or worse, fails to plan one in the first place, their goals quickly fall apart.

This web app will allow a user to create a workout routine that will be kept on their private account. Each routine can be broken down into different days or variations of exercises, allowing the user to customize their week with workout days rather than a specific exercise each day.

## Data Model

(__TODO__: a description of your application's data and their relationships to each other) 

The application will store Users, Lists and Items

* users can have multiple lists (via references)
* each list can have multiple items (by embedding)

(__TODO__: sample documents)

An Example User:

```javascript
{
  username: "shannonshopper",
  hash: 
  calendar: "a calendar for each user"
  routines: "Objects that contain a user's routines"
}
```

An Example routine

```javascript
{
  user: // a reference to a User object
  name: "Name of routine: e.g, LEG DAY LEG DAY",
  exercises: [
    { name: "squats", reps: "25",sets: "3", restTime: "1 minute" completed: false},
    { name: "leg press", reps: "20",sets: "3", restTime:"1 minute",completed: true},
  ],
  createdAt: // timestamp
}
```


## [Link to Commented First Draft Schema](db.mjs) 

## Wireframes

(__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.)

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
2. as a user, I can view all the routines I've made
3. as a user, I can create new routines and tasks of my choosing
4. as a user, I can access my home page, letting me see the schedule I've created for myself.
5. as a user, I can add pre-made routines to my schedule.
6. as a user, I can check off tasks or routines as I complete them each day.
7. as a user, I can edit previously set schedules.



## Research Topics

* (5 points) Integrate user authentication
    * Tentatively considering passport for user authentication
    * Storing account information and simplifies the process of authentication methods for the user (this is automatic)
* (2 points) Use Sass as a CSS preprocessor
    * Is a pre-processor, meaning it is a tool that allows for the compilation of CSS code using their own unique syntax.
    * Apparently very organized and easy to learn, making it an efficient tool for editing HTML presentation.
* (5 points) React.js or Vue.js
    * I plan on using one of these front end frameworks for my project. Which one will depends on further research.
    * As of now, it appears that React offers a more robust and flexible experience, given that it allows for a great variety of components to be appended. 
    * Vue, however, seems to suggest components to the user instead. From my readings, it appears that Vue is 'simpler' to learn.



## [Link to Initial Main Project File](app.mjs) 


## Annotations / References Used
* I used an online tutorial to help with some of my calendar logic
    * https://www.youtube.com/watch?v=m9OSBJaQTlM
* At the moment, I've only really delved into sass.
    * https://sass-lang.com/guide/
* For react, I used the default react tutorials
    * https://react.dev/learn, https://react.dev/learn/tutorial-tic-tac-toe

    


