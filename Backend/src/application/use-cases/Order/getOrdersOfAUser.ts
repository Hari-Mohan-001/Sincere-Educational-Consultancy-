import { IOrderRepository } from "../../../domain/repositories/IOrderRepository"

export const getUserOrderById = (orderRepository:IOrderRepository)=>{
    const execute = async(userId:string)=>{
       const orders = await orderRepository.getAllOrdersOfAUserById(userId)
       if(orders.length){
        return orders
       }else{
        return []
       }
    }
    return{
        execute
    }
}