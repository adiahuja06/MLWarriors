const Joi=require('joi');

const signupValidation=(req,res,next)=>{
    const schema=Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        role: Joi.string().valid('0', '1').required()  

    });
    const { error }=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request",error})
    }
    next(); //this will make the next call in flow once validation is done
}

const loginValidation=(req,res,next)=>{
    const schema=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required()

    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request",error})
    }
    next(); //this will make the next call in flow once validation is done
}

module.exports={
    signupValidation,
    loginValidation,
};