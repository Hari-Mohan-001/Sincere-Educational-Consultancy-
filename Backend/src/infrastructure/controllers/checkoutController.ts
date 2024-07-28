import { Request, Response } from "express";
import { createCheckoutSession } from "../services/StripePayment";

const checkoutController = () => {
  const createCheckout = async (req: Request, res: Response) => {
    try {
      const { enrolldetails, country,userId,totalAmount} = req.body;
      const sessionId = await createCheckoutSession(enrolldetails,country,userId,totalAmount);
      res.json({ id: sessionId})
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };
  return {
    createCheckout,
  };
};

export default checkoutController;
