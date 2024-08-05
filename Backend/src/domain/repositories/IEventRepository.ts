
import { EventDTO } from "../../application/dtos/eventDto";
import { Event, PopulatedEvent } from "../entities/events";



export interface IEventRepository{
    createNewEvent(event:EventDTO) : Promise<boolean>
      getAllEvents(userId:string):Promise<PopulatedEvent[]>
      
}