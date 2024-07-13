export class adminDTO {
    constructor(
        public name: string,
        public email: string,
        public mobile: string,
        public password:string,
        public country:string,
        public role?:"admin" | "counsellor",
        public image ?: string

    ) {}
}