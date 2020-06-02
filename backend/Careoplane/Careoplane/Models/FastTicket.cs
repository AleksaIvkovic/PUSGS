﻿using Careoplane.Database;
using Careoplane.TOModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.Models
{
    public class FastTicket
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int SeatId { get; set; }

        public int FlightId { get; set; }
        
        [Required]
        public Airline Airline { get; set; }

        public FastTicket() { }
        
        public FastTicket(TOFastTicket fastTicket, DatabaseContext _context)
        {
            SeatId = fastTicket.SeatId;
            FlightId = fastTicket.FlightId;
            Airline = _context.Airlines.Find(fastTicket.AirlineName);
        }
    }
}