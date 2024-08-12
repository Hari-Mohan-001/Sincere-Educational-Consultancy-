export class userUpdateDTO {
    constructor(
        public name?: string,
        public email?: string,
        public mobile?: string,
        public image?: string,
        public password?:string,

    ) {}
}