import { EventDTO } from "../../application/dtos/eventDto";
import { Event } from "../entities/events";

 import { Document, Types } from 'mongoose';

interface IMessage {
  _id: Types.ObjectId;
  sender: Types.ObjectId;
  senderModel: "admin" | "User";
  receiver: Types.ObjectId;
  receiverModel: "admin" | "User";
  content: string;
  timestamp: Date;
}

 export type MessageDocument = Document<unknown, {}, IMessage> & IMessage;

export interface IMessageRepository{
      getAllMessagesForCounsellor(data:MessageFetchingData):Promise<MessageDocument[]>
      
}