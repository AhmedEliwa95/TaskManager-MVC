const express= require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectedDB = require('./db/connect');
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config();
const mongoose = require('mongoose');

//Middlewares 
app.use(express.json());
app.use(express.static('./public'))


// Routes
app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

// app.get('/api/v1/tasks')         -Get All Tasks  
// app.post('/api/v1/tasks')        -Post new Task
// app.get('/api/v1/tasks/:id')     -Get Single Task with ID    
// app.patch('/api/v1/tasks/:id')   -Edit Single Task with ID  
// app.delete('/api/v1/tasks/:id')  -Delete Single Task with ID   


const port =process.env.PORT ||  3000;

const start = (async()=>{
    try{
        await connectedDB(process.env.MONGO_URI)
        app.listen(port,()=>{console.log(`listenning on port: ${port}...`);})
    }catch(error){
        console.log(error)
    }
})()


