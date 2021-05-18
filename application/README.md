# Application Folder

## Purpose
The purpose of this folder is to store all the source code and related files for your team's application. Source code MUST NOT be in any of folder. <strong>YOU HAVE BEEN WARNED</strong>

You are free to organize the contents of the folder as you see fit. But remember your team is graded on how you use Git. This does include the structure of your application. Points will be deducted from poorly structured application folders.

## Please use the rest of the README.md to store important information for your team's application.

***

# First time run instructions
- Make sure you have Node.js v14.15 installed
- Make sure you have SQL installed
- Go into the application/server/ directory and create a `.env` file with the following contents:
```
DB_PASSWORD=<your database password>
DB_NAME=team3db
PORT=8080
```
- Open up two terminal tabs or windows
  - Terminal 1: Go into the server directory and enter
    -  `npm install`
    -  `npm run seed:db`
    -  `npm run start:dev`
  - Terminal 2: Go into the client directory and enter
    - `npm install`
    - `npm start`


The app should open up on your browser at localhost:3000
