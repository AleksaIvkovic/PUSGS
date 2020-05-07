using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.Models
{
    public class Vehicle
    {
        [Key]
        public int VehicleId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Brand { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public int NumOfSeats { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        public double PricePerDay { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public double Rating { get; set; }

        [Required]
        public List<UnavailableDate> UnavailableDates { get; set; }

        [Required]
        public bool IsOnSale { get; set; }

        [Required]
        public RentACar RentACar { get; set; }
    }

    public class UnavailableDate
    {
        [Key]
        public int DateId { get; set; }
        public DateTime Date { get; set; }

        [Required]
        public Vehicle Vehicle { get; set; }
    }
}
