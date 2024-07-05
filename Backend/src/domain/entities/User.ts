import bcrypt from "bcrypt"

export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public mobile: string,
        public password: string,
        public qualification : 'PlusTwo' | "Degree" | "Masters",
        public isEnrolled: boolean= false,
        public isBlocked: boolean= false,
    ) {}

    public async hashPassword():Promise<void>{
        const saltRounds = 8
        this.password = bcrypt.hashSync(this.password , saltRounds)
        console.log(this.password);
        
    }
}

