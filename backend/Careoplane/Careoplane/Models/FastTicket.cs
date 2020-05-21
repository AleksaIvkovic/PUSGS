﻿using Careoplane.TOModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.Models
{
    public class FastTicket
    {
        [Key]
        public int FastTicketId { get; set; }

        public Seat Seat { get; set; }

        public Flight Flight { get; set; }
        
        public FastTicket() { }
        
        public FastTicket(TOFastTicket fastTicket)
        {
        }

    }
}