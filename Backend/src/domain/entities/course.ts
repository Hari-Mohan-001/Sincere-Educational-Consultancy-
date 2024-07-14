import { ObjectId } from "mongoose";

export class Course {
    constructor(
        public id: string|ObjectId,
        public name: string,
        public qualification: string,
        public fees:string,
        public description:string,
        public logo: string,
        public duration: string,
        public university:string
    ) {}
}