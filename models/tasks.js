const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Must Provide The name'],
        minlength:[3,'must Have at least 3 Chars'],
        maxlength:[20,'Not Exceed 20 Chars'],
        trim:true
    },completed:{
        type:Boolean,
        default:false
    }
})
const Task = mongoose.model('Task' , taskSchema);

module.exports = Task