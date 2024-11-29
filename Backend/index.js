const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
//form data ko server me accept kerne ke liye bodyparser use kiya
//evry env should accept

require('dotenv').config();
const PORT = process.env.PORT || 8080;
require('./Models/db');
const EmployeeRouter = require('./Routes/EmployeeRoutes');

app.get('/',(req,res)=>{
    res.send('Employee Mgn server is running');
})

//jaise hi  url  ata api/employee render in routers
//middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/api/employees',EmployeeRouter);

app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`);
})
