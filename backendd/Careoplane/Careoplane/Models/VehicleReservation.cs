using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.Models
{
    public class VehicleReservation
    {
        [Key]
        public int ReservationId { get; set; }

        [Required]
        public Vehicle Vehicle { get; set; }

        [Required]
        public DateTime FromDate { get; set; }

        [Required]
        public string FromLocation { get; set; }

        [Required]
        public DateTime ToDate { get; set; }

        [Required]
        public string ToLocation { get; set; }

        [Required]
        public int NumOfDays { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public string Type { get; set; }
    }
}
