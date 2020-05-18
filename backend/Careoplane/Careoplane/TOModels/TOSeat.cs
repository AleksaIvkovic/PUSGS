using Careoplane.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.TOModels
{
    public class TOSeat
    {
        public int SeatId { get; set; }

        public int FlightId { get; set; }

        public string Type { get; set; }

        public bool Occupied { get; set; }

        public double Price { get; set; }

        public double Discount { get; set; }
    }
}
