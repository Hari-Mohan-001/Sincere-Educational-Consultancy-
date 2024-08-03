import { EventDTO } from "../../application/dtos/eventDto";
import { Event } from "../../domain/entities/events";
import { IEventRepository } from "../../domain/repositories/IEventRepository";
import eventModel from "../../presentation/models/eventModel";

export class mongoEventRepository implements IEventRepository{
    public async createNewEvent(event: EventDTO): Promise<boolean> {
        console.log(';mongeve',event);
        
        try {
           const newEvent = new eventModel({
            userId:event.userId,
            userName:event.userName,
            userEmail:event.userEmail,
            enrollType:event.enrollType,
            enrollImage:event.enrollImage,
            date:event.date,
            time:event.time,
            selectedDateTime:event.selectedDateTime,
            counsellorId:event.counsellorId
           })
           const saveEvent = await newEvent.save()
           return saveEvent != null
        } catch (error) {
           throw error 
        }
    }

    public async getAllEvents(userId: string): Promise<Event[]> {
        try {
            const events = await eventModel.find({userId:userId})
            return events.map((event)=> new Event(
                event._id.toString(),
                event.userId.toString(),
                event.userName,
                event.userEmail,
                event.enrollType,
                event.enrollImage,
                event.date,
                event.time,
                event.selectedDateTime,
                event.counsellorId.toString()
            ))
        } catch (error) {
            throw error
        }
    }
}