using Careoplane.TOModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.Models
{
    public class Flight
    {
        [Key]
        public int FlightId { get; set; }

        public Airline Airline { get; set; }

        public string Origin { get; set; }

        public string Destination { get; set; }

        public DateTime Departure { get; set; }

        public DateTime Arrival { get; set; }

        public double Distance { get; set; }

        public ICollection<Connection> Conntections { get; set; }

        public ICollection<Seat> Seats { get; set; }
    }

    public class Connection
    {
        [Key]
        public int ConntectionId { get; set; }

        public string Value { get; set; }

        [Required]
        public Flight Flgiht { get; set; }
    }
}
