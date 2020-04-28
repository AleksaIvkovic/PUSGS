using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Careoplane.Models
{
    public class Flight
    {
        [Key]
        public int FlightId {get; set;}

        public Airline Airline { get; set; }

        public string Origin { get; set; }

        public string Destination { get; set; }

        public DateTime Departure { get; set; }

        public DateTime Arrival { get; set; }

        public int DurationHours { get; set; }

        public int DurationMinutes { get; set; }
        
        public double Distance { get; set; }

        public IEnumerable<Connection> Conntections { get; set; }

        [NotMapped]
        public List<double> Pricess { get; set; }

        public IEnumerable<Seat> Seats { get; set; }
    }

    public class Connection
    {
        [Key]
        public int ConntectionId { get; set; }

        [Required]
        public Flight Flgiht { get; set; }
    }
}