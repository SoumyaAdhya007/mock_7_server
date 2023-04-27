const express=require("express");
const cors=require("cors")
const {connection}=require("./config/db")
const {UserRouter}=require("./Router/user.router")
require("dotenv").config();
const app=express();
app.use(cors());
app.use(express.json())
app.use("/user",UserRouter)
app.get("/",(req,res)=>{
    res.send("Hello")
})

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Conected to DB")
        console.log(`Serever is running on ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})