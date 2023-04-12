const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = (url)=>{
    return mongoose.connect(url , {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }).then(()=>console.log('Connected To DB'))
    .catch((err)=>console.log(`MongooseError: ${err.errors.message}`))
    
};
module.exports = connectDB