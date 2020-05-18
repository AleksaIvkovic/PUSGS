import { TOPrimaryObject } from './t-o-primary-object.model';

export class TOFlightReservation {
    public type = 'flight';

    constructor(
        public flightId: number,
        public seats: TOPrimaryObject[] = [],
        public people: {name: string, surname: string, id: number}[] = []
    ) {}
}
