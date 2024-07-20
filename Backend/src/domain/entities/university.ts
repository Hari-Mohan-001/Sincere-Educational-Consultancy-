import mongoose, { ObjectId } from "mongoose";

export interface Country {
    id: string | mongoose.Types.ObjectId;
    name: string;
  }

export class University {
    constructor(
        public id: string|ObjectId,
        public name: string,
        public address: string,
        public ranking:string,
        public logo:string,
        public images: string[],
        public country: string|mongoose.Types.ObjectId,
        public isApproved: boolean
    ) {}
}
export class PopulatedUniversity {
    constructor(
        public id: string|mongoose.Types.ObjectId,
        public name: string,
        public address: string,
        public ranking:string,
        public logo:string,
        public images: string[],
        public country:{},
        public isApproved: boolean
    ) {}
}


// Extend the Mongoose Document to include the populated fields
export interface IUniversityDocument extends mongoose.Document {
    name: string;
    address: string;
    ranking: string;
    logo: string;
    images: string[];
    country: Country; // Ensure this reflects the populated field
    isApproved: boolean;
  }
