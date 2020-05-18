using Careoplane.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.TOModels
{
    public class TOFlight
    {
        public int FlightId { get; set; }

        public string AirlineName { get; set; }

        public string Origin { get; set; }

        public string Destination { get; set; }

        public string Departure { get; set; }

        public string Arrival { get; set; }

        public double Distance { get; set; }

        public List<TOPrimaryObject> Conntections { get; set; }
        public List<TOSeat> Seats { get; set; }

        public TOFlight() { }
        public TOFlight(Flight flight) {
            AirlineName = flight.Airline.Name;
            Arrival = flight.Arrival.ToString();
            Departure = flight.Departure.ToString();
            Distance = flight.Distance;
            FlightId = flight.FlightId;
            Origin = flight.Origin;
            Destination = flight.Destination;

            Conntections = new List<TOPrimaryObject>();
            foreach (var connection in flight.Conntections)
            {
                Conntections.Add(new TOPrimaryObject(connection.ConntectionId, connection.Value, connection.Flight.FlightId));
            }

            Seats = new List<TOSeat>();
            foreach (var seat in flight.Seats)
            {
                Seats.Add(new TOSeat(seat));
            }
        }
    }
}
