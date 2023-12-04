require("dotenv").config();
const express=require("express");
const{connection}=require("./db")
const{router}=require("./Routes/Products")
const cors = require('cors')

const app=express();


app.use(express.json());

app.use(cors())

app.use("/products",router);

const port=process.env.PORT || 8080;

app.listen(port,async ()=>{
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error while connecting to Database :"+error);
    }
    console.log(`Listening on port ${port}...`)
})