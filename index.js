const express=require("express")
const {connectToMongoDB} = require('./connect');
const urlRoute=require("./routes/url")
require('dotenv').config();

const app=express();
const PORT=8001;
connectToMongoDB(process.env.MONGO_URL).then(()=>console.log("Mongodb connected"));

app.use(express.json())
app.use('/url',urlRoute);

app.listen(PORT,()=>console.log(`Server running on PORT ${PORT}`))