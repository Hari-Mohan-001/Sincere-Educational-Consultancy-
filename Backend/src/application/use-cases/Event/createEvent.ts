import { IEventRepository } from "../../../domain/repositories/IEventRepository";
import { EventDTO } from "../../dtos/eventDto";

export const addNewEvent = (eventRepository: IEventRepository) => {
  const execute = async (eventDto: EventDTO) => {
    const createEvent = eventRepository.createNewEvent(eventDto);
    return createEvent != null;
  };
  return {
    execute,
  };
};

export const existingEvent = (eventRepository: IEventRepository)=>{
  const execute = async(orderId:string)=>{
        const eventId = await eventRepository.doesEventExist(orderId)
        console.log(eventId,'usecase');
        
        return eventId
  }
  return{
    execute
  }
}
export const UpdateEvent = (eventRepository: IEventRepository)=>{
  const execute = async(eventId:string, date:string,time:string, selectedDateTime:string)=>{
        const reponse = await eventRepository.updateEvent(eventId,date,time,selectedDateTime)
        return reponse
  }
  return{
    execute
  }
}
