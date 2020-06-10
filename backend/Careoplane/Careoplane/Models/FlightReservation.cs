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
        public List<FlightReservationDetail> FlightReservationDetails { get; set; }
        public DateTime TimeOfCreation { get; set; }
        //public string CreatorUsername { get; set; }
        //public int VehicleReservationId { get; set; }
    }
}
