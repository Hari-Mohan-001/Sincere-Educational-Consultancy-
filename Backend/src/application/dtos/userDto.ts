export class userDTO {
    constructor(
        public name: string,
        public email: string,
        public mobile: string,
        public password:string,
        public qualification : 'PlusTwo' | "Degree" | "Masters",
        public isEnrolled : boolean=false,
        public isBlocked : boolean= false

    ) {}
}