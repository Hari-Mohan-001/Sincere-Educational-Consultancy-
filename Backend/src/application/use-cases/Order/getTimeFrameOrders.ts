import { IOrderRepository } from "../../../domain/repositories/IOrderRepository"

export const timeFrameorders = (orderRepository:IOrderRepository)=>{
    const execute = async(timeFrame:string)=>{
       const orderCount = await orderRepository.getTimeFrameOrders(timeFrame)
       return orderCount
    }
    return{
        execute
    }
}