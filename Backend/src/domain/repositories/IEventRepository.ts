
import { EventDTO } from "../../application/dtos/eventDto";
import { Event, PopulatedEvent } from "../entities/events";



export interface IEventRepository{
    createNewEvent(event:EventDTO) : Promise<boolean>
      getAllEvents(userId:string):Promise<PopulatedEvent[]>
      doesEventExist(orderId:string):Promise<string>
      updateEvent(eventId:string,date:string,time:string, selectedDateTime:string):Promise<boolean>
      rescheduleTheEvent(orderId:string):Promise<boolean>     
}