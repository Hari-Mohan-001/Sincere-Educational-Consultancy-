import { NextFunction, Request, Response } from "express";
import { paymentSuccessResponse } from "../services/stripePaymentSuccess";
import { OrderDTO } from "../../application/dtos/orderDto";
import { mongoOrderRepository } from "../persistance/mongoOrderRepository";
import { createOrder } from "../../application/use-cases/Order/createOrder";
import { updateEnrollStatus } from "../../application/use-cases/User/updateEnrollStatus";
import { mongoUserRepository } from "../persistance/mongoUserRepository";
import { getAllOrders } from "../../application/use-cases/Order/getOrders";
import { getTotalvalue } from "../../application/use-cases/Order/getTotalValue";
import { timeFrameorders } from "../../application/use-cases/Order/getTimeFrameOrders";
import { getAdminOrders } from "../../application/use-cases/Order/getOrdersForAdmin";
import { getUserOrderById } from "../../application/use-cases/Order/getOrdersOfAUser";
const orderRepository = new mongoOrderRepository();
const userRepository = new mongoUserRepository();

const orderController = () => {
  const CheckPaymentAndCreateOrder = async (req: Request, res: Response) => {
    console.log("checpay");

    try {
      const sessionObj = paymentSuccessResponse(req, res);

      if (!sessionObj) {
        throw new Error("Session object is undefined");
      }
      const orderDto = new OrderDTO(
        sessionObj?.userId,
        sessionObj?.enrollId,
        sessionObj?.country,
        sessionObj.totalAmount
      );

      const createNewOrder = await createOrder(orderRepository).execute(
        orderDto
      );
      const updateUserStatus = await updateEnrollStatus(userRepository).execute(
        sessionObj.userId
      );
      

      res.status(200).send("Event received");
    } catch (error) {}
  };
  const getEnrolledOrders = async (req: Request, res: Response) => {
    const countryId = req.params.countryId;
    try {
      const Orders = await getAllOrders(orderRepository).execute(countryId);
      
      res.status(200).json({ message: "success", data: Orders });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };

  const getTotalOrdervalue = async (req: Request, res: Response) => {
    const timeFrame = req.params.timeFrame;
    console.log(timeFrame);

    try {
      const totalValue = await getTotalvalue(orderRepository).execute(
        timeFrame
      );
      res.status(200).json({ message: "success", data: totalValue });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };

  const getAllTimeframeOrders = async (req: Request, res: Response) => {
    const timeFrame = req.params.timeFrame;
    try {
      const orders = await timeFrameorders(orderRepository).execute(timeFrame);
      res.status(200).json({ message: "success", data: orders });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };

  const getAllOrdersForAdmin = async(req: Request, res: Response)=>{
    try {
      // const{startDate , endDate} = req.query
      const startDate = req.query.startDate as string | undefined;
    const endDate = req.query.endDate as string | undefined;
      
      if(startDate && endDate){
        const orders = await getAdminOrders(orderRepository).execute(startDate,endDate)
        res.status(200).json({message:'success', data:orders})
      }else{
        const orders = await getAdminOrders(orderRepository).execute()
        res.status(200).json({message:'success', data:orders})
      }
      
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  }

  const getUserOrders =async(req: Request, res: Response,next:NextFunction)=>{
    try {
      const userId = req.params.userId
      const orders = await getUserOrderById(orderRepository).execute(userId)
      if(orders.length){
        res.status(200).json({message:'success', data:orders})
      }
    } catch (error) {
      next(error)
    }
  }
  return {
    CheckPaymentAndCreateOrder,
    getEnrolledOrders,
    getTotalOrdervalue,
    getAllTimeframeOrders,
    getAllOrdersForAdmin,
    getUserOrders
  };
};

export default orderController;
