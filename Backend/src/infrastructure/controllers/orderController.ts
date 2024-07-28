import { Request, Response } from "express";
import { paymentSuccessResponse } from "../services/stripePaymentSuccess";
import { OrderDTO } from "../../application/dtos/orderDto";
import { mongoOrderRepository } from "../persistance/mongoOrderRepository";
import { createOrder } from "../../application/use-cases/Order/createOrder";
import { updateEnrollStatus } from "../../application/use-cases/User/updateEnrollStatus";
import { mongoUserRepository } from "../persistance/mongoUserRepository";
import { getAllOrders } from "../../application/use-cases/Order/getOrders";
const orderRepository = new mongoOrderRepository();
const userRepository = new mongoUserRepository();
const orderController = () => {
  const CheckPaymentAndCreateOrder = async (req: Request, res: Response) => {
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
      console.log(createNewOrder, updateUserStatus);

      res.status(200).send("Event received");
    } catch (error) {}
  };
  const getEnrolledOrders = async (req: Request, res: Response) => {
    const countryId = req.params.countryId;
    try {
      const Orders = await getAllOrders(orderRepository).execute(countryId);
      console.log(Orders);
      res.status(200).json({ message: "success", data: Orders });
    } catch (error) {}
  };
  return {
    CheckPaymentAndCreateOrder,
    getEnrolledOrders,
  };
};

export default orderController;
