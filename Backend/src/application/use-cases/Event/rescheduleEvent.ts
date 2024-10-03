import { IEventRepository } from "../../../domain/repositories/IEventRepository"

 export const eventReschedule = (eventRepository:IEventRepository)=>{
   const execute = async(orderId:string)=>{
  const response = await eventRepository.rescheduleTheEvent(orderId)
   return response
   }
   return{
    execute
   }
}