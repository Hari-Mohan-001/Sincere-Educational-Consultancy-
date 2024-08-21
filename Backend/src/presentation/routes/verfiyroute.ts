import express, { Request, Response } from "express";
import orderController from "../../infrastructure/controllers/orderController";
const OrderController = orderController()
const verifyPaymentRouter = express.Router()

verifyPaymentRouter.post("/webhook", express.raw({ type: "application/json" }),(req:Request,res:Response)=>{
    console.log("Webhook received:");
  OrderController.CheckPaymentAndCreateOrder(req,res)
})

export default verifyPaymentRouter