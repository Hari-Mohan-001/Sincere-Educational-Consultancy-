import { EventDTO } from "../../application/dtos/eventDto";
import { MessageFetchingData } from "../../application/interfaces/messageFetchData";
import { Event } from "../entities/events";

 import { Document, Types } from 'mongoose';

interface IMessage {
  _id: Types.ObjectId;
  sender: Types.ObjectId;
  senderModel: "admin" | "User";
  receiver: Types.ObjectId;
  receiverModel: "admin" | "User";
  content: string | null;
  image:string|null;
  timestamp: Date;
}

 export type MessageDocument = Document<unknown, {}, IMessage> & IMessage;

export interface IMessageRepository{
      getAllMessagesForCounsellor(data:MessageFetchingData):Promise<MessageDocument[]>
      
}