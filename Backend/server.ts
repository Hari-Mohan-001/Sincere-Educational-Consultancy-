import express, { urlencoded } from "express";
import dotenv from "dotenv"
import { dbConnect } from "./src/infrastructure/config/dbConnection";
import userAuthRoute from "./src/presentation/routes/userAuthRoutes"

dotenv.config()
dbConnect()


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = process.env.PORT || 3000

app.listen(port , ()=>{
    console.log(`server running on the port ${port}`);   
})

app.use("/api/user", userAuthRoute)