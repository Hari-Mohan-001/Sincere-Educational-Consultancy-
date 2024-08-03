import { Request, Response } from "express";
import { Stripe } from "stripe";

interface EnrollDetails {
  id: string;
  name: string;
  amount: string;
  image: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createCheckoutSession = async (
  enrolldetails: EnrollDetails,
  country: string,
  userId: string,
  totalAmount:string
) => {
  try {
    // Construct line items based on the enrolldetails
    const lineItems = [
      {
        price_data: {
          currency: "inr", // You may want to use currency based on country or enrolldetails
          product_data: {
            name: enrolldetails?.name,
            images: [enrolldetails?.image], // Optional: Add image to product
          },
          unit_amount: parseInt(totalAmount, 10) * 100, // Convert amount from string to number and then to cents
        },
        quantity: 1,
      },
    ];

    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/orderSuccess",
      // cancel_url: ,
      metadata: {
        enrollDetails: JSON.stringify(enrolldetails),
        country: country,
        userId: userId,
        totalAmount:totalAmount
      },
    });
// Respond with the session ID to the client
    return session.id;
  } catch (error) {
    console.log(error);
  }
};
