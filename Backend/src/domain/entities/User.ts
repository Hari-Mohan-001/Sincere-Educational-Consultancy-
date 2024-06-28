export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public mobile: number|string,
        public password: string,
        public qualification : 'plusTwo' | "Degree" | "Masters",
        public isEnrolled: boolean= false,
        public isBlocked: boolean= false,
    ) 
    {}
}