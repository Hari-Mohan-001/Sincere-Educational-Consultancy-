import { ObjectId } from "mongoose";

export class Order {
    constructor(
        public id: string|ObjectId,
        public user: string,
        public enrollment: string,
        public country: string,
        public total: string,
        public orderStatus:string,
    ) {}
}