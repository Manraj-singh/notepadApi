const express = require('express')
const app = express()
const mongoose = require('mongoose');
const userroutes = require('./routes/crud')
const authroutes = require("./routes/auth")
const bodyParser = require('body-parser')
require('dotenv').config()



app.use(bodyParser.json())
app.use('/',authroutes)
app.use('/', userroutes )





//connecting to DB
mongoose.connect(process.env.DB_URI,
 {useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log("connected to DB ..")
 })

 


const port = 3000
app.listen(port, () => console.log(`server runnning at http://localhost:${port}`))