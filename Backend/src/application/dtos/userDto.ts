export class userDTO {
    constructor(
        public name: string,
        public email: string,
        public mobile: string,
        public password:string,
        public qualification : 'plusTwo' | "Degree" | "Masters",
        public isEnrolled : boolean=false,
        public isBlocked : boolean= false

    ) {}
}