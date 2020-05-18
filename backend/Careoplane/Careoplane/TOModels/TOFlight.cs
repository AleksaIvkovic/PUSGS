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

        public int DurationHours { get; set; }

        public int DurationMinutes { get; set; }

        public double Distance { get; set; }

        public List<TOPrimaryObject> Conntections { get; set; }
        public List<TOPrimaryObject> Pricess { get; set; }

        public List<TOSeat> Seats { get; set; }
    }
}
