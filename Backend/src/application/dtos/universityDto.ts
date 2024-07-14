export class universityDTO {
    constructor(
        public name: string,
        public address: string,
        public ranking: string,
        public logo:string,
        public images : string[],
        public country: string,
        public isApproved: boolean=false
    ) {}
}