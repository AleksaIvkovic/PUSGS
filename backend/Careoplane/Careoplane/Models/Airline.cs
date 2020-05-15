using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.Models
{
    public class Airline
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Name { get; set; }

        public string Address { get; set; }

        public string Description { get; set; }

        public ICollection<Price> Prices { get; set; }

        public ICollection<SeatArrangement> SeatingArrangement { get; set; }

        public ICollection<Segment> SegmentLength { get; set; }

        public ICollection<Flight> Flights { get; set; }

        public string Image { get; set; }

        public double Rating { get; set; }

        public ICollection<Destination> Destinations { get; set; }

        public ICollection<FastTicket> FastTickets { get; set; }
    }

    public class Destination
    {
        [Key]
        public int PriceId { get; set; }

        public string Value { get; set; }

        [Required]
        public Airline Airline { get; set; }
    }

    public class Price
    {
        [Key]
        public int PriceId { get; set; }

        public double Value { get; set; }

        [Required]
        public Airline Airline { get; set; }
    }

    public class SeatArrangement
    {
        [Key]
        public int PriceId { get; set; }

        public double Value { get; set; }

        [Required]
        public Airline Airline { get; set; }
    }

    public class Segment
    {
        [Key]
        public int PriceId { get; set; }

        public double Value { get; set; }

        [Required]
        public Airline Airline { get; set; }
    }
}
