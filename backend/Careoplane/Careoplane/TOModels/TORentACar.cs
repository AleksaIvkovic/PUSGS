using Careoplane.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.TOModels
{
    public class TORentACar
    {
        public string Name { get; set; }

        public string Address { get; set; }

        public string Description { get; set; }

        public ICollection<Vehicle> Vehicles { get; set; }

        public ICollection<string> Locations { get; set; }

        public double Rating { get; set; }

        public ICollection<int> Prices { get; set; }
    }
}
