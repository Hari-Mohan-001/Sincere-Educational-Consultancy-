import { IOrderRepository } from "../../../domain/repositories/IOrderRepository"

export const getTotalvalue = (orderRepository:IOrderRepository)=>{
    const execute = async(timeframe:string)=>{
            const totalValue = await orderRepository.getTotalOrderValue(timeframe)  
            // if(totalValue){
            //     console.log('at val',totalValue);
                
            //     return totalValue
            // }else{
            //     console.log('daily');
                
            //     return 0
            // }
            console.log(totalValue,'setval');
            
            return totalValue
            
    }
    return{
        execute
    }
}