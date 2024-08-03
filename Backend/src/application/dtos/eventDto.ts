import { ObjectId } from "mongoose";

export class EventDTO {
  constructor(
    public userId: string,
    public userEmail: string,
    public userName: string,
    public enrollType: string,
    public enrollImage: string,
    public date: string,
    public time: string,
    public selectedDateTime: string,
    public counsellorId: string
  ) {}
}