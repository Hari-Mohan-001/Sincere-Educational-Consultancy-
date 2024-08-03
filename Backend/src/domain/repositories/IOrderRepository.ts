import { OrderDTO } from "../../application/dtos/orderDto"
import { Order } from "../entities/order"



export interface IOrderRepository{
    createOrder(domain:OrderDTO):Promise<boolean>
    getAllOrders(countryId:string):Promise<Order[]>
    updateOrder(orderId:string,date:string,time:string):Promise<boolean>
}