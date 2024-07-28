import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const paymentSuccessResponse = (req: Request, res: Response) => {

  const sig = req.headers["stripe-signature"];

  let event;
  try {
    console.log("sign", req.body);

    event = stripe.webhooks.constructEvent(
      req.body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentId = session.payment_intent as string;
      const metadata = session.metadata;
      console.log(metadata);

      const enrollDetails = JSON.parse(metadata?.enrollDetails || "{}");
      const country = metadata?.country || "Unknown";
      const userId = metadata?.userId || "Unknown";
      const enrollId = enrollDetails.id
      const totalAmount = metadata?.totalAmount|| "Unknown";
    //   const totalAmount = enrollDetails
      const sessionObj = {enrollId,country,userId,totalAmount}
      return sessionObj
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
  }
};
