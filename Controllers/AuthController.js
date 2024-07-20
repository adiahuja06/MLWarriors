const bcrypt=require('bcrypt');
const UserModel=require('../Models/user') //you need to include the database where you want to add the data
const jwt=require('jsonwebtoken');
const login=async (req,res)=>{
    try{
     const {email,password}=req.body;
     const user=await UserModel.findOne({email});
     const errorMS='Authentication failed email or password is wrong';
     if(!user){
        return res.status(403).json({message:errorMS,success:false});
     }
     const isPassEqual=await bcrypt.compare(password,user.password); //password enetered by user and in database will be checked
     if(!isPassEqual)
     {
        return res.status(403).json({message:errorMS,success:false});
     }

     const jwtToken=jwt.sign(
        {email:user.email , _id:user.id},
        process.env.JWT_SECRET,
        {expiresIn:'24h'}

     )


     res.status(200).json({
        message:"Login successfull",
        success:true,
        jwtToken,
        email,
        name:user.name,
        role:user.role
     })
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            success:false
        })
    }
}
const signup=async (req,res)=>{
    try{
     const {name,email,password,role}=req.body;
     const user=await UserModel.findOne({email});
     if(user){
        return res.status(409).json({message:'User is already exist,you can login',success:false});
     }
     const usermodel=new UserModel({name,email,password,role}); //new object to be pushed into the user model
     //we need to bcrypt the password
     usermodel.password=await bcrypt.hash(password,10);
     await usermodel.save(); //the data will be saved in the database
     res.status(201).json({
        message:"Signup successfull",
        success:true
     })
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            success:false
        })
    }
}
module.exports={
    signup,
    login
};