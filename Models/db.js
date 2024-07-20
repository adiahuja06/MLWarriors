const mongoose=require('mongoose')
const mongo_uri=process.env.MONGO_CONN;
mongoose.connect(mongo_uri).then(()=>{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log('MongoDB connection error',e);
})

