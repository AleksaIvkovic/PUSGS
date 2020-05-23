using Careoplane.TOModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
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

        public void FromTO(TOVehicleReservation toVehicleReservation)
        {
            FromDate = DateTime.Parse(toVehicleReservation.FromDate);
            FromLocation = toVehicleReservation.FromLocation;
            NumOfDays = toVehicleReservation.NumOfDays;
            Price = toVehicleReservation.Price;
            ReservationId = toVehicleReservation.ReservationId;
            ToDate = DateTime.Parse(toVehicleReservation.ToDate);
            ToLocation = toVehicleReservation.ToLocation;
            Type = toVehicleReservation.Type;
            Vehicle vehicle = new Vehicle();
            //vehicle.FromTO(toVehicleReservation.Vehicle);
            Vehicle = vehicle;
        }

        public TOVehicleReservation ToTO()
        {
            TOVehicleReservation toVehicleReservation = new TOVehicleReservation();
            toVehicleReservation.FromDate = FromDate.ToString();
            toVehicleReservation.FromLocation = FromLocation;
            toVehicleReservation.NumOfDays = NumOfDays;
            toVehicleReservation.Price = Price;
            toVehicleReservation.ReservationId = ReservationId;
            toVehicleReservation.ToDate = ToDate.ToString();
            toVehicleReservation.ToLocation = ToLocation;
            toVehicleReservation.Type = Type;
            toVehicleReservation.Vehicle = Vehicle.ToTO();

            return toVehicleReservation;
        }
    }
}
