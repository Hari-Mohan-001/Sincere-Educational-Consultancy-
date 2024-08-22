import { IEventRepository } from "../../../domain/repositories/IEventRepository";
import { EventDTO } from "../../dtos/eventDto";

export const addNewEvent = (eventRepository: IEventRepository) => {
  const execute = async (eventDto: EventDTO) => {
    const createEvent = eventRepository.createNewEvent(eventDto);
    return createEvent != null;
  };
  return {
    execute,
  };
};
