const mongoose = require('mongoose');
const Task = require('../models/tasks');
const asyncWrapper = require('../middleware/async')
const {createCustomError } = require('../errors/custom-error')

const getAllTasks =asyncWrapper( async (req,res)=>{
    const tasks =await Task.find().sort({'completed':-1}).select(' -__v')
    res.status(200).send({tasks})
    // res.status(200).send({status:'Success' , data:{tasks , nbHits:tasks.length}})
})

const createTask =asyncWrapper( async (req,res)=>{
    
        const task = new Task(req.body)
        await task.save()
        res.status(201).send({task})
    
});

const getTask =asyncWrapper( async (req,res,next)=>{
    
    const {id:TaskID} = req.params
    const task =await  Task.findOne({_id:TaskID})
    if(!task){
        return next(createCustomError( `not task with ID: ${TaskID}` , 404))
    }
    res.status(200).json({task})
    
});

const updateTask =asyncWrapper( async (req,res)=>{   
    const {id:TaskID} = req.params;
    const task =await Task.findOneAndUpdate({_id:TaskID},req.body,{new:true , runValidators:true});
    // await task.save()
    if(!task){
        return res.status(404).send({msg: `no Task with This ID: ${TaskID}`})
    }
    res.status(201).send({task})
});

const deleteTask =asyncWrapper( async (req,res)=>{
    
    const {id:TaskID} = req.params
    const deletedTask = await Task.findOneAndDelete({_id:TaskID}) ;
    if(!deletedTask){
        return res.status(401).send({msg:`no task with ID: ${TaskID}`})        
    }
    res.status(200).send({ deletedTask})
    
})
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}