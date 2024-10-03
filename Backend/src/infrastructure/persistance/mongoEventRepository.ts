import { EventDTO } from "../../application/dtos/eventDto";
import { Event, PopulatedEvent } from "../../domain/entities/events";
import { IEventRepository } from "../../domain/repositories/IEventRepository";
import eventModel from "../../presentation/models/eventModel";
import orderModel from "../../presentation/models/orderModel";

export class mongoEventRepository implements IEventRepository {
  public async createNewEvent(event: EventDTO): Promise<boolean> {
    try {
      const newEvent = new eventModel({
        userId: event.userId,
        userName: event.userName,
        userEmail: event.userEmail,
        enrollType: event.enrollType,
        enrollImage: event.enrollImage,
        date: event.date,
        time: event.time,
        selectedDateTime: event.selectedDateTime,
        counsellor: event.counsellorId,
        orderId:event.orderId
      });
      const saveEvent = await newEvent.save();
      return saveEvent != null;
    } catch (error) {
      throw error;
    }
  }

  public async getAllEvents(userId: string): Promise<PopulatedEvent[]> {
    try {
      const events = await eventModel
        .find({ userId: userId })
        .populate("counsellor", "name");
      return events.map(
        (event) =>
          new PopulatedEvent(
            event._id.toString(),
            event.userId.toString(),
            event.userName,
            event.userEmail,
            event.enrollType,
            event.enrollImage,
            event.date,
            event.time,
            event.selectedDateTime,
            event.counsellor,
            event.orderId
          )
      );
    } catch (error) {
      throw error;
    }
  }
  public async doesEventExist(orderId: string): Promise<string> {
    try {
      const event = await eventModel.findOne({orderId:orderId})
      console.log(event,'mongo');
      
      return event?._id?.toString() || "";  // Return the _id as a string or an empty string
    } catch (error) {
      throw error
    }
  }

  public async updateEvent(eventId: string,date:string,time:string, selectedDateTime:string): Promise<boolean> {
    try {
      const update = await eventModel.findByIdAndUpdate(eventId, {
        $set:{
          date:date,
          time:time,
          selectedDateTime:selectedDateTime
        },
      }, {new:true})
      return update!=null
    } catch (error) {
      throw error
    }
  }

  public async rescheduleTheEvent(orderId: string): Promise<boolean> {
    try {
      const updateOrder = await orderModel.findByIdAndUpdate(orderId,{
        $set:{
          rescheduleRequest:true
        }
      },{new:true})
      return updateOrder ? true : false;
    } catch (error) {
      console.log(error);
      return false
    }
  }
}
