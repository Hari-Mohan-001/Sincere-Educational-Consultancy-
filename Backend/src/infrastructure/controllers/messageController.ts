import { Request, Response } from "express"
import { getAllMessages } from "../../application/use-cases/Messages/getAllMessagesForCounsellor";
import { mongoMessageRepository } from "../persistance/mongoMessageRepository";
import { MessageFetchingData } from "../../application/interfaces/messageFetchData";

const messageRepository = new mongoMessageRepository()

export const messageController = ()=>{
    const getMessagesForCounsellor = async (req:Request,res:Response)=>{
        const { counsellorId, counsellorModel, userId, userModel } = req.query;
        if(!req.query) return
        const data: MessageFetchingData = {
            counsellorId: counsellorId as string,
            counsellorModel: counsellorModel as string,
            userId: userId as string,
            userModel: userModel as string,
        };
           const datas = await getAllMessages(messageRepository).execute(data)
           res.status(200).json({message:'success', data:datas})
        try {
     
        } catch (error) {
            
        }
      
    }
    return{
        getMessagesForCounsellor
    }
}