

export class userStatusData {
    constructor(
        
        public id: string,
        public name: string,
        public image: string,
        public isOnline:boolean,
        public lastSeen: string| Date|null
        
    ) {}
}