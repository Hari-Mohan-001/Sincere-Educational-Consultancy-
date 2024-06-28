import express, { urlencoded } from "express";
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = process.env.PORT || 3000

app.listen(port , ()=>{
    console.log(`server running on the port ${port}`);   
})