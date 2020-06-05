export class PassengersSeat {
    constructor(
        public seatId: number = 0,
        public username: string = null,
        public name: string = null,
        public surname: string = null,
        public passport: string = null,
        public passengeSeatId: number = 0,
        public flightReservationDetailId: number = 0)
        {}
}