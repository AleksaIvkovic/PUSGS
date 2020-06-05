using System.ComponentModel.DataAnnotations;
using System.Data;

namespace Careoplane.Models
{
    public class PassengerSeat
    {
        [Required]
        public FlightReservationDetail FlightReservationDetail { get; set; }
        [Key]
        public int PassengerSeatId { get; set; }
        public int SeatId { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Passport { get; set; }
    }
}