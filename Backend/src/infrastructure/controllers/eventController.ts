import { NextFunction, Request, Response } from "express";
import { EventDTO } from "../../application/dtos/eventDto";
import { mongoEventRepository } from "../persistance/mongoEventRepository";
import { addNewEvent, existingEvent, UpdateEvent } from "../../application/use-cases/Event/createEvent";
import { getUserEvents } from "../../application/use-cases/Event/getEvents";
import { mongoOrderRepository } from "../persistance/mongoOrderRepository";
import { orderUpdate } from "../../application/use-cases/Order/updateOrder";
import { eventReschedule } from "../../application/use-cases/Event/rescheduleEvent";

const eventRepository = new mongoEventRepository();
const orderController = new mongoOrderRepository();

const eventController = () => {
  const createEvent = async (req: Request, res: Response) => {
    const {
      userId,
      userName,
      userEmail,
      enrollType,
      enrollImage,
      date,
      time,
      selectedDate,
      orderId,
      counsellorId,
    } = req.body;
    try {
      const eventDto = new EventDTO(
        userId,
        userName,
        userEmail,
        enrollType,
        enrollImage,
        date,
        time,
        selectedDate,
        counsellorId,
        orderId
      );
     const existingEventId = await existingEvent(eventRepository).execute(orderId)
     console.log(existingEventId,'contr');
     
     if(existingEventId!= ""){
      await UpdateEvent(eventRepository).execute(existingEventId,date,time, selectedDate)
     }else{
      const newEvent = await addNewEvent(eventRepository).execute(eventDto);
     }
      
      const updateOrder = await orderUpdate(orderController).execute(
        orderId,
        date,
        time
      );
        res.status(200).json({ message: "success" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };

  const getEvents = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
      const events = await getUserEvents(eventRepository).execute(userId);

      if (events.length) {
        res.status(200).json({ message: "success", data: events });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };

  const rescheduleEvent = async(req: Request, res: Response, next:NextFunction)=>{
    try {
      const orderId= req.params.orderId
      const response = await eventReschedule(eventRepository).execute(orderId)
      if(response){
        res.status(200).json({message:'success'})
      }
    } catch (error) {
      next(error)
    }
  }
  return {
    createEvent,
    getEvents,
    rescheduleEvent
  };
};

export default eventController;
