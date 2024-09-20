import { MessageFetchingData } from "../../application/interfaces/messageFetchData";
import {
  IMessageRepository,
  MessageDocument,
} from "../../domain/repositories/IMessageRepository";
import messageModel from "../../presentation/models/messageModel";

export class mongoMessageRepository implements IMessageRepository {
  public async getAllMessagesForCounsellor(
    data: MessageFetchingData
  ): Promise<MessageDocument[]> {
    try {
      const messages = await messageModel
        .find({
          $or: [
            {
              sender: data.counsellorId,
              senderModel: data.counsellorModel,
              receiver: data.userId,
              receiverModel: data.userModel,
            },
            {
              sender: data.userId,
              senderModel: data.userModel,
              receiver: data.counsellorId,
              receiverModel: data.counsellorModel,
            },
          ],
        })
        .populate("sender", "name image")
        .populate("receiver", "name image")
        .populate('replyTo')
        .sort("timestamp");

      return messages;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
