using Careoplane.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.TOModels
{
    public class TOFastTicket
    {
        public int SeatId { get; set; }

        public int FlightId { get; set; }

        public TOFastTicket() { }
        public TOFastTicket(FastTicket fastTicket) {
            SeatId = fastTicket.SeatId;
            FlightId = fastTicket.FlightId;
        }
    }
}
