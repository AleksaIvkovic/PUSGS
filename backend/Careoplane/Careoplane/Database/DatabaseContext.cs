﻿using Careoplane.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public DbSet<Airline> Airlines { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<FastTicket> FastTickets { get; set; }

        #region Rent A Car

        public DbSet<RentACar> RentACars { get; set; }

        public DbSet<Vehicle> Vehicles { get; set; }

        public DbSet<Careoplane.Models.VehicleReservation> VehicleReservation { get; set; }

        #endregion
    }
}
