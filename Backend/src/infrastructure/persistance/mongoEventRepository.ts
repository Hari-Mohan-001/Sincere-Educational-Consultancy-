import { EventDTO } from "../../application/dtos/eventDto";
import { Event, PopulatedEvent } from "../../domain/entities/events";
import { IEventRepository } from "../../domain/repositories/IEventRepository";
import eventModel from "../../presentation/models/eventModel";

export class mongoEventRepository implements IEventRepository {
  public async createNewEvent(event: EventDTO): Promise<boolean> {
    try {
      const newEvent = new eventModel({
        userId: event.userId,
        userName: event.userName,
        userEmail: event.userEmail,
        enrollType: event.enrollType,
        enrollImage: event.enrollImage,
        date: event.date,
        time: event.time,
        selectedDateTime: event.selectedDateTime,
        counsellor: event.counsellorId,
      });
      const saveEvent = await newEvent.save();
      return saveEvent != null;
    } catch (error) {
      throw error;
    }
  }

  public async getAllEvents(userId: string): Promise<PopulatedEvent[]> {
    try {
      const events = await eventModel
        .find({ userId: userId })
        .populate("counsellor", "name");
      return events.map(
        (event) =>
          new PopulatedEvent(
            event._id.toString(),
            event.userId.toString(),
            event.userName,
            event.userEmail,
            event.enrollType,
            event.enrollImage,
            event.date,
            event.time,
            event.selectedDateTime,
            event.counsellor
          )
      );
    } catch (error) {
      throw error;
    }
  }
}
