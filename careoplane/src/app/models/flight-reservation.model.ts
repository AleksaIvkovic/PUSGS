export class FlightReservation {
    public type = 'flight';

    constructor(
        public flightId: number,
        public seats: number[] = [],
        public people: {name: string, surname: string, id: number}[] = []
    ) {}
}