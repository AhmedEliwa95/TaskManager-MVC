const {CustomerAPIError } = require('../errors/custom-error')
const  errorHandlerMiddleware = (err,req,res,next)=>{
    if(err instanceof CustomerAPIError){
        return res.status(err.statusCode).send({msg:err.message})
    }
    return res.status(500).send({msg:'Something went Wrong, please try again later'})
};
module.exports = errorHandlerMiddleware
