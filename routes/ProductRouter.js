const {ensureAuthenticated}=require('../Middleware/Auth')
const router=require('express').Router();

/*ensureauthenticated is a middleware and helps in authenticating weather the user is logged in or not if user is logged in then definately they
will be able to access whatever is there in response
*/
router.get('/',ensureAuthenticated,(req,res)=>{
    //so now this route will only be exeuted once the authentication is done
    console.log("logged in user details",req.user)
    res.status(200).json([
        {
            name:"mobile",
            price:10000
        },
        {
            name:"tv",
            price:20000
        }
        //here instead of sending the data as JSON in reponse we can send the whole website
    ])
});

module.exports=router;