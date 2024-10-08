import bcrypt from "bcrypt"

export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public mobile: string,
        public password: string,
        public qualification ?: 'PlusTwo' | "Degree" | "Masters",
        public image?:string,
        public isBlocked: boolean= false,
        public isEnrolled: boolean= false,
        public refreshToken?: string,
        
    ) {}

    public async hashPassword():Promise<void>{
        const saltRounds = 8
        this.password = bcrypt.hashSync(this.password , saltRounds)
        console.log(this.password);
        
    }
}

