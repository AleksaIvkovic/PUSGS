using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.Models
{
    public class FlightReservation
    {
        [Key]
        public int ReservationId { get; set; }
        public int FlightId { get; set; }
        public int SeatId { get; set; }
        public string AppUserName { get; set; }
    }
}
