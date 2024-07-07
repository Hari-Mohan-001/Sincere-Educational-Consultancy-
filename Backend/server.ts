import express, { urlencoded } from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { dbConnect } from "./src/infrastructure/config/dbConnection";
import userAuthRoute from "./src/presentation/routes/userAuthRoutes"
import cors from "cors"

dotenv.config()
dbConnect()


const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT' , 'PATCH', 'DELETE'],
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const port = process.env.PORT || 3000

app.listen(port , ()=>{
    console.log(`server running on the port ${port}`);   
})

app.use("/api/user", userAuthRoute)