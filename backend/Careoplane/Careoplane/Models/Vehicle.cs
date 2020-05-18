using Careoplane.TOModels;
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
        public ICollection<UnavailableDate> UnavailableDates { get; set; }

        [Required]
        public bool IsOnSale { get; set; }

        [Required]
        public RentACar RentACar { get; set; }

        public void FromTO(TOVehicle toVehicle)
        {
            Brand = toVehicle.Brand;
            IsOnSale = toVehicle.IsOnSale;
            Location = toVehicle.Location;
            NumOfSeats = toVehicle.NumOfSeats;
            PricePerDay = toVehicle.PricePerDay;
            Rating = toVehicle.Rating;
            RentACar rentACar = new RentACar();
            rentACar.FromTO(toVehicle.RentACar);
            RentACar = rentACar;
            Title = toVehicle.Title;
            Type = toVehicle.Type;
            UnavailableDates = new List<UnavailableDate>();
            toVehicle.UnavailableDates.ToList().ForEach(date =>
            {
                DateTime newDate = DateTime.Parse((string)(date.Value));
                UnavailableDates.Add(new UnavailableDate()
                {
                    DateId = 0,
                    Date = newDate,
                    Vehicle = this
                });
            });
            VehicleId = toVehicle.VehicleId;
            Year = toVehicle.Year;
        }

        public TOVehicle ToTO()
        {
            TOVehicle toVehicle = new TOVehicle();
            toVehicle.Brand = Brand;
            toVehicle.IsOnSale = IsOnSale;
            toVehicle.Location = Location;
            toVehicle.NumOfSeats = NumOfSeats;
            toVehicle.PricePerDay = PricePerDay;
            toVehicle.Rating = Rating;
            toVehicle.RentACar = RentACar.ToTO();
            toVehicle.Title = Title;
            toVehicle.Type = Type;
            toVehicle.UnavailableDates = new List<TOPrimaryObject>();
            UnavailableDates.ToList().ForEach(date => toVehicle.UnavailableDates.Add(
                new TOPrimaryObject() 
                { 
                    Value = date.ToString(), 
                    Reference = this 
                }));
            toVehicle.VehicleId = VehicleId;
            toVehicle.Year = Year;

            return toVehicle;
        }
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
