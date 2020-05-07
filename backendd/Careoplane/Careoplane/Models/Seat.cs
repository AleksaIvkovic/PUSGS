using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.Models
{
    public class Seat
    {
        [Key]
        public int SeatId { get; set; }

        public Airline Airline { get; set; }

        public Flight Flight { get; set; }

        public string Type { get; set; }

        public bool Occupied { get; set; }

        public double Price { get; set; }

        public double Discount { get; set; }
    }
}