const {signup,login} = require('../Controllers/AuthController')
const {signupValidation,loginValidation}=require('../Middleware/AuthValidation')

const router=require('express').Router();

router.post('/login',loginValidation,login);
router.post('/signup',signupValidation,signup);
//the above tells that whenever signup route is called first it will be validated by the middleware

module.exports=router;