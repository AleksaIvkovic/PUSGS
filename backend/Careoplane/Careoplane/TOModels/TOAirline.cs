using Careoplane.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.TOModels
{
    public class TOAirline
    {
        public string Name { get; set; }

        public string Address { get; set; }

        public string Description { get; set; }

        public List<TOPrimaryObject> Prices { get; set; }

        public List<TOPrimaryObject> SeatingArrangement { get; set; }

        public List<TOPrimaryObject> SegmentLength { get; set; }

        public List<TOFlight> Flights { get; set; }

        public string Image { get; set; }

        public double Rating { get; set; }

        public List<TOPrimaryObject> Destinations { get; set; }

        public List<TOFastTicket> FastTickets { get; set; }
    }
}
