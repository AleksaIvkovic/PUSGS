export class TOAirline {
    constructor(
        public name: string = null, 
        public address: string = null,
        public description: string = null, 
        public prices : number[] = [],
        public seatingArrangement: number[] = [],
        public segments: number[] = [],
        public flights: TOFlight[] = [],
        public picture: string = "",
        public rating: number = 0,
        public destinations: string[] = [],
        public fastTickets: TOFastTicket[] = []){
    }
}