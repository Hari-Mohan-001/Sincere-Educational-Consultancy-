import { ObjectId } from "mongoose";

export class Domain {
    constructor(
        public id: string|ObjectId,
        public name: string,
        public image: string
    ) {}
}