using Careoplane.TOModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.Models
{
    public class AppUser : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string City { get; set; }
        public string Company { get; set; }

        public TOAppUser ToTO()
        {
            return new TOAppUser()
            {
                UserName = UserName,
                Email = Email,
                Password = "",
                Name = Name,
                Surname = Surname,
                City = City,
                PhoneNumber = PhoneNumber,
                Company = Company,
                Role = ""
            };
        }
    }
}
