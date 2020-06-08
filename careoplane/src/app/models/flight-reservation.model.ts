import { FlightReservationDetails } from './flight-reservation-details.model';

export class FlightReservation {
    public type = 'flight';

    constructor(
        public flightReservationDetails: FlightReservationDetails[] = [],
        public reservationId: number = 0,
        public timeOfCreation: string = null
    ) {}
}