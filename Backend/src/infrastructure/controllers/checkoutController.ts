import { Request, Response } from "express"
import {Stripe} from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const checkoutController = ()=>{
    const createCheckout = async (req: Request, res: Response) => {
        try {
          const { enrolldetails, country } = req.body;
    
          // Construct line items based on the enrolldetails
          const lineItems = [
            {
              price_data: {
                currency: 'usd', // You may want to use currency based on country or enrolldetails
                product_data: {
                  name: enrolldetails.name,
                  images: [enrolldetails.image], // Optional: Add image to product
                },
                unit_amount: parseInt(enrolldetails.amount, 10) * 100, // Convert amount from string to number and then to cents
              },
              quantity: 1, 
            }
          ];
    
          // Create a checkout session with Stripe
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
             success_url: "http://localhost:5173/home",
            // cancel_url: ,
          });
    
          // Respond with the session ID to the client
          res.json({ id: session.id });
      } catch (error) {
        console.log(error);
        
      }
    }
    return{
        createCheckout
    }
}

export default checkoutController