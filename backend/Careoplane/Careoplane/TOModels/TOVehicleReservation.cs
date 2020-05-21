﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.TOModels
{
    public class TOVehicleReservation
    {
        public int ReservationId { get; set; }

        public TOVehicle Vehicle { get; set; }
        
        public string FromDate { get; set; }
        
        public string FromLocation { get; set; }
        
        public string ToDate { get; set; }
        
        public string ToLocation { get; set; }
        
        public int NumOfDays { get; set; }
        
        public double Price { get; set; }
        
        public string Type { get; set; }
    }
}