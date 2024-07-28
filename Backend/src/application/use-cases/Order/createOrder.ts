import { IOrderRepository } from "../../../domain/repositories/IOrderRepository"
import { OrderDTO } from "../../dtos/orderDto"

export const createOrder =(orderRepository:IOrderRepository)=>{
    const execute = async(orderDto:OrderDTO)=>{
        const createNewOrder = await orderRepository.createOrder(orderDto)
        if(createNewOrder){
            return createNewOrder
        }

    }
    return{
        execute
    }
}