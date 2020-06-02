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
        public int FlightId { get; set; }
        public int SeatId { get; set; }
        public string AppUserName { get; set; }

        public TOFlightReservation() { }
        public TOFlightReservation(FlightReservation flightReservation) {
            ReservationId = flightReservation.ReservationId;
            FlightId = flightReservation.FlightId;
            SeatId = flightReservation.SeatId;
            AppUserName = flightReservation.AppUserName;
        }
    }
}
