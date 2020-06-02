export class FlightReservation {
    public type = 'flight';

    constructor(
        public flightId: number, 
        public seatId: number,
        public appUserName: string,
        public reservationId: number
    ) {}
}