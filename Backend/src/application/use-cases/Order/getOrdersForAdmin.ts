import { IOrderRepository } from "../../../domain/repositories/IOrderRepository"

export const getAdminOrders = (orderRepository:IOrderRepository)=>{
    const execute = async()=>{
       const orders = await orderRepository.getAllOrdersForAdmin()
       if(!orders) throw new Error("Orders not found");
       return orders
    }
    return{
        execute
    }
}