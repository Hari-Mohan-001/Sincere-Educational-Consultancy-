import { ObjectId } from "mongoose";

export class Event{
    constructor(
      public id:string,
      public userId: string,
      public userEmail: string,
      public userName: string,
      public enrollType: string,
      public enrollImage: string,
      public date: string,
      public time: string,
      public selectedDateTime: string,
      public counsellor: string|ObjectId,
      public orderId: string
    ) {}
  }
export class PopulatedEvent{
    constructor(
      public id:string,
      public userId: string,
      public userEmail: string,
      public userName: string,
      public enrollType: string,
      public enrollImage: string,
      public date: string,
      public time: string,
      public selectedDateTime: string,
      public counsellor: {},
      public orderId: string|null|undefined
    ) {}
  }

