using Careoplane.Database;
using Careoplane.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.TOModels
{
    public class TOFlightReservation
    {
        public int ReservationId { get; set; }
        public List<TOFlightReservationDetail> FlightReservationDetails { get; set; }
        public string Type { get; set; }
        public TOFlightReservation() { }
        public TOFlightReservation(FlightReservation flightReservation, DatabaseContext _context) {
            ReservationId = flightReservation.ReservationId;
            FlightReservationDetails = new List<TOFlightReservationDetail>();
            Type = "flight";

            foreach(FlightReservationDetail flightReservationDetail in flightReservation.FlightReservationDetails)
            {
                FlightReservationDetails.Add(new TOFlightReservationDetail(flightReservationDetail,_context));
            }
        }
    }
}
