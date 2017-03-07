# Crossover Video Portal #

 
## Video Display Portal ##

## Features

* Login and logout
* Videos display and control
* Videos rating
* Video details page
* Cross-browser and cross-platform compatible
* Video lazy loading
* Video pause on other video play
* REST communications
* User checking
* MD5 password encryption


## General Use
* Visit homepage and login with username and password
* You will routed to videos page
* Click any video to play
* Rate videos by hovering over stars rating
* Press video title to display video details page
* To go back to videos page, press on browse videos from navigation bar
* To logout, press logout from navigation bar

### Test user
* Username:     ali
* Password:     password

## Meet The Engineers
* Author: Salah Alomari

## Work done:
### Files:
* app: contains all the app js and html files
** app/auth: authorization controller and template
** app/services: backend services
** app/video: video detail page template and controller
** app/videos: videos index page template and controller
** app/app.js: main app file, contains routing, http interceptors, http route detectors to check authenticated from non authenticated users, and where the main modules are loaded
** index.html: main page
* helpers: contains helper functions for the app
* styles: contains styling files 

### Design:
* The design was based on bootstrap, fontawesome, and bootswatch for themes
* I wanted to deliver a clean minimal design with a clean look and interactive options

## Start the app (Instructions)
After cloning (or Downloading) the project into your local do from the root repository
* sudo npm install -g bower
* npm install   - to install dependancies
* When prompted to select angular version, choose 1
* mongod    	- to start the database
* npm start   	- to start the project and access the portal on local host
* Access application on "localhost:8000"

## Linting
* Eslint used for linting based on hackreactor styling guide
To run the lint file do:
* npm run lint

## Testing
* Must have chrome installed
* all tests are in specs folder
* Frontend:    gulp karma

## Dependancies
### Server Side
* Express 4.13.4
* Body-parser 1.5.1
* Mongoose 4.4.20
* Morgan 1.7.0
* Q 1.4.1

### Client Side
* angularjs: 1.5.x
* angular-sanitize: 1.5.x
* angular-md5: 0.1.10
* angular-bootstrap: 2.3.1
* videogular: 1.4.4
* angular-animate: 1.5.9
* angular-ui-router: 0.3.x
* angular-mocks: 1.5.9
* ngInfiniteScroll: 1.0.0
* jquery: 3.1.1

### Testing suits
#### Front End
* Karma
* Jasmine
* Chrome
* Istanbul

