import { ObjectId } from "mongoose";

export class University {
    constructor(
        public id: string|ObjectId,
        public name: string,
        public address: string,
        public ranking:string,
        public logo:string,
        public images: string[],
        public country: string|ObjectId,
        public isApproved: boolean
    ) {}
}