const mongoose = require('mongoose')

// const mongo_url = process.env.MONGO_URL;
//connection to db
mongoose.connect("mongodb+srv://sumitlakra500:1234@cluster0.oskza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log('MongoDB connected successfully');
}).catch((err)=>{
    console.log('Error in MongoDB connection',err);
})