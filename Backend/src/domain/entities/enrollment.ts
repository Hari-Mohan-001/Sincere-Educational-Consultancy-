import { ObjectId } from "mongoose";

export class Enrollment{
    constructor(
        public id: string|ObjectId,
        public name: string,
        public amount: string,
        public image: string
    ) {}
}