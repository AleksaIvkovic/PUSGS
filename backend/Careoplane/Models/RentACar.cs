using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.Models
{
    public class RentACar
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Description { get; set; }

        public List<Vehicle> Vehicles { get; set; }

        public List<Location> Locations { get; set; }

        public double Rating { get; set; }

        public List<Price> Prices { get; set; }
    }

    public class Location
    {
        [Key]
        public int LocationId { get; set; }

        public string LocationValue { get; set; }

        [Required]
        public RentACar RentACar { get; set; }
    }

    public class Price
    {
        [Key]
        public int PriceId { get; set; }

        public double PriceValue { get; set; }

        [Required]
        public RentACar RentACar { get; set; }
    }
}
