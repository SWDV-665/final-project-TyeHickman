# SWDV 665 Final Project
## Tye Hickman

### App Name: mySelf

---

This application is a basic habit tracker with the intention of helping users build good habits and destroy bad ones.

The application uses a cordova vibration plugin to vibrate the device when a user adds an occurence of the habit they are tracking. 
To do this, simply click on a habit in your dashboard and select "I did this".

The application uses a custom Angular service for handling data between the front end of the application and the mySelf-server repo.

The application contains some small stylistic changes in Dark Mode. I didn't have time to implement a toggle feature so to see these changes, the device that runs this code should be set to dark mode.

Habits are added in the "My Habits" section and can be tracked from the "Dashboard". 

The Dashboard also features a simplistic reordering feature that allows you to modify the order in which habit cards appear.

---

This application requires running the 'mySelf-server' and a mongoDB database called 'mySelf' with a 'habits' collection.

In a mongo shell type:

`use mySelf`

The mySelf-server will create the correct collection. To seed the mongoDB after creation, run the mySelf server and use the provided curl command to create a basic habit.

Habits can also be added from the user interface in the 'My Habits' tab but both options require and instance of mongoDB and its daemon process to be running.

A link to the mySelf server repo will be submitted with this assignment.

---

I've included a .zip archive of the mySelf server in this repo. To use it, extract the mySelf-server.zip to anywhere outside the root of this project and follow the steps in the project's README.md file to get it up and runnig.