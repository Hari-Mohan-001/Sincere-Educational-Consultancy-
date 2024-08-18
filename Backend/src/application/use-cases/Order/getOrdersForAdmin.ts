import { IOrderRepository } from "../../../domain/repositories/IOrderRepository"

export const getAdminOrders = (orderRepository:IOrderRepository)=>{
    const execute = async(startDate?:string, endDate?:string)=>{
       const orders = await orderRepository.getAllOrdersForAdmin(startDate,endDate)
       if(!orders) throw new Error("Orders not found");
       return orders
    }
    return{
        execute
    }
}