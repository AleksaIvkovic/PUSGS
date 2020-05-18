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

        public ICollection<double> Prices { get; set; }

        public ICollection<int> SeatingArrangement { get; set; }

        public ICollection<int> SegmentLength { get; set; }

        public ICollection<TOFlight> Flights { get; set; }

        public string Image { get; set; }

        public double Rating { get; set; }

        public ICollection<string> Destinations { get; set; }

        public ICollection<TOFastTicket> FastTickets { get; set; }
    }
}
