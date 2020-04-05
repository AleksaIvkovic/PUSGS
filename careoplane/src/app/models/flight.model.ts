export class Flight {
    public departure: Date;
    public arrival: Date;
    public duration: Date;
    public connections: string[];
    public price: number;

    constructor(departure: Date, arrival: Date, duration: Date, connections: string[], price: number){
        this.departure = departure;
        this.arrival = arrival;
        this.duration = duration;
        this.connections = connections;
        this.price = price;
    }
}
