using System.ComponentModel.DataAnnotations;

namespace Careoplane.Models
{
    public class FastTicket
    {
        [Key]
        public int FastTicketId { get; set; }

        public double NewPrice { get; set; }

        public Seat Seat { get; set; }

        public Flight Flight { get; set; }
    }
}