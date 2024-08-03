import { IEventRepository } from "../../../domain/repositories/IEventRepository"

export const getUserEvents = (eventRepository:IEventRepository)=>{
    const execute = async(userId: string)=>{
       const events = await eventRepository.getAllEvents(userId)
       if(events.length){
        return events
       }
       throw new Error("Unable to fetch events");
       
    }
    return{
        execute
    }
}