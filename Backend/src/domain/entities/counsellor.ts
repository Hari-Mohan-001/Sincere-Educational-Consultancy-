import mongoose from "mongoose";

interface Country{
    id: mongoose.Types.ObjectId,
    name: string
}

export class Counsellor {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public mobile: string,
        public password: string,
        public country:string,
        public role?: "admin" | "counsellor",
        public image?: string,
        public isApproved?: boolean,

    ) {}

}