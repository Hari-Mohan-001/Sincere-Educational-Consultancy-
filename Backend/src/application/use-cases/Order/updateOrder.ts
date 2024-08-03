import { IOrderRepository } from "../../../domain/repositories/IOrderRepository"

export const orderUpdate = (orderRepository:IOrderRepository)=>{
    const execute = async(orderId:string,date:string, time:string)=>{
        const update = await orderRepository.updateOrder(orderId,date,time)
          return update != null
    }
    return{
        execute
    }
}