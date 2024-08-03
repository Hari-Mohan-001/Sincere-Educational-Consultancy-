import { IMessageRepository } from "../../../domain/repositories/IMessageRepository"
import { MessageFetchingData } from "../../interfaces/messageFetchData"

export const getAllMessages = (messageRepository:IMessageRepository)=>{
    const execute = async(data:MessageFetchingData)=>{
            const getMessages = await messageRepository.getAllMessagesForCounsellor(data)
            
                return getMessages       
    }
    return{
        execute
    }
}