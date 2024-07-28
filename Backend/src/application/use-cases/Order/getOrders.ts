import { IOrderRepository } from "../../../domain/repositories/IOrderRepository"

export const getAllOrders = (orderRepository:IOrderRepository)=>{
    const execute = async(countryId:string)=>{
      const getOrders = await orderRepository.getAllOrders(countryId)
      return getOrders
    }
    return{
        execute
    }
}