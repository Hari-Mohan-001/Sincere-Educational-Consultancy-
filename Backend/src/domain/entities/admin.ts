import bcrypt from "bcrypt"

export class Admin {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public mobile: string,
        public password: string,
        public country:string,
        public role?: "admin" | "counsellor",
        public image?: string
    ) {}

    public async hashPassword():Promise<void>{
        const saltRounds = 8
        this.password = bcrypt.hashSync(this.password , saltRounds)
        console.log(this.password);
        
    }
}