Swagger-express
=========
This project is to start a localhost that serves APIs routes in multiple projects.

## Installation & Quick Start
```
cd <project path>/examples
npm install
node app.js
```

## To setup a new project
- Create API files: This is the place you set your APIs logic and Swagger 

Refer: ../examples/APIs/meetingRoomsAPIs.js

- Create Routing file: Set URL for each APIs 

Refer: ../examples/meetingRoomsRoutes.js

- Setup project in app.js
```
//////////MEETING-ROOMS/////////////
// I have set the APIs under folder './APIs/*' so preferably set your routes under ../example/APIs folder
var mrRoutes =  require('./meetingRoomsRoutes.js');
// Set your new project baseURL so that your APIs started with : <host>/newProject/...
app.use('/meetingRooms', mrRoutes)

```
- Start server
Make sure you are in example folder.
```
node app.js
```
You should see  "***Express started on port 3000***" at your terminal.

Go to browser/POSTMAN to query first API under http://localhost:3000/meetingRooms/users and Voila!

- To get auto-generated json for Swagger
    - Go to browser/POSTMAN to query first API under http://localhost:3000/swagger.json
    - Copy all and go to [Swagger Editor](http://editor.swagger.io/) and paste Json at File > Paste Json

**NOTE**
------
- You need to add in own host and basePath at the editor if you want to query it straightaway at Swagger editor
```
info:
  title: SEED APIs
  version: 1.0.0
  description: <descriptions>
swagger: '2.0'
host: 'localhost:3000'   //<<<<<<<<ADD THIS
basePath: /meetingRooms //<<<<<<<<ADD THIS as what you specify in app.js
```
- Add edit/add more APIs path for Swagger
```
var options = {
    swaggerDefinition: {
      ....
    apis: ['./APIs/*'], //<<<<< Change this path or add more paths as you want
  };
```

## Refer
1. [Express 4](https://expressjs.com/en/guide/routing.html): To know more on Express routings and APIs
2. [Swagger Jsdoc](https://github.com/Surnet/swagger-jsdoc): To know more about setting up Swagger in .Js
3. [Swagger specification](http://swagger.io/specification/): For swagger syntax
4. [Swagger Editor](http://editor.swagger.io/): To paste your JSON(from localhost:3000/swagger.json) and edit swagger on live mode


## Useful tutorial
- http://mherman.org/blog/2016/05/26/swagger-and-nodejs/#.WJq5RBJ946g
