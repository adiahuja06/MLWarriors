const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const AuthRouter=require('./routes/AuthRouter')
const ProductRouter=require('./routes/ProductRouter')
require('dotenv').config();
require("./Models/db");
require("../backend/Models/user")
const PORT=process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send('PONG');
})

app.use(bodyParser.json());
app.use(cors()) //this is added in middleware. This will help tp restrict the usage, we can mention the port numbers,ip address from where request can be made
//since the above is blank so we are allowing all the IP to access this or global access

app.use('/auth',AuthRouter); //this will take you to the Authrouter.js and there it will take to 
app.use('/products',ProductRouter); //this will call the product route once the authentication is done
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})