export class Flight {
    constructor(
        public origin: string,
        public destination: string,
        public departure: Date,
        public arrival: Date, 
        public duration: number,
        public distance: number, 
        public connections: string[], 
        public price: number){}
}
