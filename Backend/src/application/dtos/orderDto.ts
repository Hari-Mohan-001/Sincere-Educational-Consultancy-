import { ObjectId } from "mongoose";

export class OrderDTO {
  constructor(
    public user: string,
    public enrollment: string,
    public country: string,
    public totalAmount:string
  ) {}
}