using Careoplane.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.TOModels
{
    public class TOFastTicket
    {
        public int FastTicketId { get; set; }

        public TOSeat Seat { get; set; }

        public TOFlight Flight { get; set; }

        public TOFastTicket()
        {
        }
        public TOFastTicket(FastTicket fastTicket)
        {
        }
    }
}
