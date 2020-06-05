using Careoplane.Models;

namespace Careoplane.TOModels
{
    public class TOPassengerSeat
    {
        public int FlightReservationDetailId { get; set; }
        public int PassengerSeatId { get; set; }
        public int SeatId { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Passport { get; set; }

        public TOPassengerSeat() { }
        public TOPassengerSeat(PassengerSeat passengerSeat)
        {
            PassengerSeatId = passengerSeat.PassengerSeatId;
            FlightReservationDetailId = passengerSeat.FlightReservationDetail.FlightReservationDetailId;
            SeatId = passengerSeat.SeatId;
            Username = passengerSeat.Username;
            Name = passengerSeat.Name;
            Surname = passengerSeat.Surname;
            Passport = passengerSeat.Passport;
        }
    }
}