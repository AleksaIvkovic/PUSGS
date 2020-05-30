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
        
        public FastTicket() { }
        
        public FastTicket(TOFastTicket fastTicket)
        {
        }
    }
}