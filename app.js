const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const connectDatabase=require('./config/database')
const dotenv=require("dotenv")


dotenv.config({ path: "./config/config.env"})

connectDatabase()
const app=express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))



const userModel=require('./model/userModel')


const userRoute= require('./routes/userRoute')


app.use(userRoute)


app.listen(90)