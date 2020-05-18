using Careoplane.TOModels;
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

        public ICollection<Vehicle> Vehicles { get; set; }

        public ICollection<Location> Locations { get; set; }

        public double Rating { get; set; }

        public ICollection<PriceList> Prices { get; set; }

        public RentACar() { }

        public void FromTO(TORentACar toRentACar)
        {
            Name = toRentACar.Name;
            Address = toRentACar.Address;
            Description = toRentACar.Description;
            Rating = toRentACar.Rating;
            Vehicles = new List<Vehicle>();
            Locations = new List<Location>();
            Prices = new List<PriceList>();
            toRentACar.Vehicles.ToList().ForEach(vehicle => Vehicles.Add(vehicle));
            toRentACar.Locations.ToList().ForEach(location => Locations.Add(new Location() { LocationValue = location, RentACar = this })) ;
            toRentACar.Prices.ToList().ForEach(price => Prices.Add(new PriceList()
            { PriceValue = price, RentACar = this }));
        }
    }

    public class Location
    {
        [Key]
        public int LocationId { get; set; }

        public string LocationValue { get; set; }

        [Required]
        public RentACar RentACar { get; set; }
    }

    public class PriceList
    {
        [Key]
        public int PriceId { get; set; }

        public double PriceValue { get; set; }

        [Required]
        public RentACar RentACar { get; set; }
    }
}

