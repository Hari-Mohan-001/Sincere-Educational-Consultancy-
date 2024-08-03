import { Request, Response } from "express"
import { EventDTO } from "../../application/dtos/eventDto";
import { mongoEventRepository } from "../persistance/mongoEventRepository";
import { addNewEvent } from "../../application/use-cases/Event/createEvent";
import { getUserEvents } from "../../application/use-cases/Event/getEvents";
import { mongoOrderRepository } from "../persistance/mongoOrderRepository";
import { orderUpdate } from "../../application/use-cases/Order/updateOrder";

const eventRepository = new mongoEventRepository() 
const orderController = new mongoOrderRepository()

const eventController = ()=>{ 
    const createEvent = async(req:Request,res:Response)=>{ 
        console.log('req',req.body);
        
        const {userId, userName, userEmail,enrollType, enrollImage, date, time, selectedDate,orderId, counsellorId} = req.body
         try {
            
            
            const eventDto = new EventDTO(userId,userName,userEmail,enrollType,enrollImage,date,time,selectedDate,counsellorId)
            console.log('evedto',eventDto);
            const newEvent = await addNewEvent(eventRepository).execute(eventDto)
            const updateOrder = await orderUpdate(orderController).execute(orderId,date,time)
            if(newEvent){
                res.status(200).json({message:"success"})
            }
            
         } catch (error) {
            if (error instanceof Error) { 
                res.status(400).json({ message: error.message });
              } else {
                res.status(400).json({ message: "An unknown error occurred" });
              } 
         }
    }

    const getEvents = async (req:Request,res:Response)=>{
        const userId = req.params.userId
        
        try {
            const events = await getUserEvents(eventRepository).execute(userId)
            console.log('getent',events);
            
            if(events.length){
                res.status(200).json({message:'success', data:events})
            }
        } catch (error) {
            if (error instanceof Error) { 
                res.status(400).json({ message: error.message });
              } else {
                res.status(400).json({ message: "An unknown error occurred" });
              } 
        }
    }
    return{
        createEvent,
        getEvents
    }
}

export default eventController