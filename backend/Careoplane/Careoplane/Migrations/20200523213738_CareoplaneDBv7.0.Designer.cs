﻿// <auto-generated />
using System;
using Careoplane.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Careoplane.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20200523213738_CareoplaneDBv7.0")]
    partial class CareoplaneDBv70
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Careoplane.Models.Airline", b =>
                {
                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Rating")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Name");

                    b.ToTable("Airlines");
                });

            modelBuilder.Entity("Careoplane.Models.Connection", b =>
                {
                    b.Property<int>("ConntectionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FlightId")
                        .HasColumnType("int");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ConntectionId");

                    b.HasIndex("FlightId");

                    b.ToTable("Connection");
                });

            modelBuilder.Entity("Careoplane.Models.Destination", b =>
                {
                    b.Property<int>("DestinationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AirlineName")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("DestinationId");

                    b.HasIndex("AirlineName");

                    b.ToTable("Destination");
                });

            modelBuilder.Entity("Careoplane.Models.FastTicket", b =>
                {
                    b.Property<int>("FastTicketId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AirlineName")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int?>("FlightId")
                        .HasColumnType("int");

                    b.Property<int?>("SeatId")
                        .HasColumnType("int");

                    b.HasKey("FastTicketId");

                    b.HasIndex("AirlineName");

                    b.HasIndex("FlightId");

                    b.HasIndex("SeatId");

                    b.ToTable("FastTickets");
                });

            modelBuilder.Entity("Careoplane.Models.Flight", b =>
                {
                    b.Property<int>("FlightId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AirlineName")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("Arrival")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Departure")
                        .HasColumnType("datetime2");

                    b.Property<string>("Destination")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Distance")
                        .HasColumnType("float");

                    b.Property<string>("Origin")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("FlightId");

                    b.HasIndex("AirlineName");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("Careoplane.Models.Location", b =>
                {
                    b.Property<int>("LocationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LocationValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RentACarName")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LocationId");

                    b.HasIndex("RentACarName");

                    b.ToTable("Location");
                });

            modelBuilder.Entity("Careoplane.Models.Price", b =>
                {
                    b.Property<int>("PriceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AirlineName")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("Value")
                        .HasColumnType("float");

                    b.HasKey("PriceId");

                    b.HasIndex("AirlineName");

                    b.ToTable("Price");
                });

            modelBuilder.Entity("Careoplane.Models.PriceList", b =>
                {
                    b.Property<int>("PriceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("PriceService")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("PriceValue")
                        .HasColumnType("float");

                    b.Property<string>("RentACarName")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("PriceId");

                    b.HasIndex("RentACarName");

                    b.ToTable("PriceList");
                });

            modelBuilder.Entity("Careoplane.Models.RentACar", b =>
                {
                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Rating")
                        .HasColumnType("float");

                    b.HasKey("Name");

                    b.ToTable("RentACars");
                });

            modelBuilder.Entity("Careoplane.Models.Seat", b =>
                {
                    b.Property<int>("SeatId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Discount")
                        .HasColumnType("float");

                    b.Property<int>("FlightId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Occupied")
                        .HasColumnType("bit");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("SeatId");

                    b.HasIndex("FlightId");

                    b.ToTable("Seats");
                });

            modelBuilder.Entity("Careoplane.Models.SeatArrangement", b =>
                {
                    b.Property<int>("SeatArrangementId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AirlineName")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("Value")
                        .HasColumnType("float");

                    b.HasKey("SeatArrangementId");

                    b.HasIndex("AirlineName");

                    b.ToTable("SeatArrangement");
                });

            modelBuilder.Entity("Careoplane.Models.Segment", b =>
                {
                    b.Property<int>("SegmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AirlineName")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("Value")
                        .HasColumnType("float");

                    b.HasKey("SegmentId");

                    b.HasIndex("AirlineName");

                    b.ToTable("Segment");
                });

            modelBuilder.Entity("Careoplane.Models.UnavailableDate", b =>
                {
                    b.Property<int>("DateId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("VehicleId")
                        .HasColumnType("int");

                    b.HasKey("DateId");

                    b.HasIndex("VehicleId");

                    b.ToTable("UnavailableDate");
                });

            modelBuilder.Entity("Careoplane.Models.Vehicle", b =>
                {
                    b.Property<int>("VehicleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Brand")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsOnSale")
                        .HasColumnType("bit");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumOfSeats")
                        .HasColumnType("int");

                    b.Property<double>("PricePerDay")
                        .HasColumnType("float");

                    b.Property<double>("Rating")
                        .HasColumnType("float");

                    b.Property<string>("RentACarName")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("VehicleId");

                    b.HasIndex("RentACarName");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("Careoplane.Models.VehicleReservation", b =>
                {
                    b.Property<int>("ReservationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("FromDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("FromLocation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumOfDays")
                        .HasColumnType("int");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<DateTime>("ToDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ToLocation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VehicleId")
                        .HasColumnType("int");

                    b.HasKey("ReservationId");

                    b.HasIndex("VehicleId");

                    b.ToTable("VehicleReservation");
                });

            modelBuilder.Entity("Careoplane.Models.Connection", b =>
                {
                    b.HasOne("Careoplane.Models.Flight", "Flight")
                        .WithMany("Connections")
                        .HasForeignKey("FlightId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Careoplane.Models.Destination", b =>
                {
                    b.HasOne("Careoplane.Models.Airline", "Airline")
                        .WithMany("Destinations")
                        .HasForeignKey("AirlineName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Careoplane.Models.FastTicket", b =>
                {
                    b.HasOne("Careoplane.Models.Airline", null)
                        .WithMany("FastTickets")
                        .HasForeignKey("AirlineName");

                    b.HasOne("Careoplane.Models.Flight", "Flight")
                        .WithMany()
                        .HasForeignKey("FlightId");

                    b.HasOne("Careoplane.Models.Seat", "Seat")
                        .WithMany()
                        .HasForeignKey("SeatId");
                });

            modelBuilder.Entity("Careoplane.Models.Flight", b =>
                {
                    b.HasOne("Careoplane.Models.Airline", "Airline")
                        .WithMany("Flights")
                        .HasForeignKey("AirlineName");
                });

            modelBuilder.Entity("Careoplane.Models.Location", b =>
                {
                    b.HasOne("Careoplane.Models.RentACar", "RentACar")
                        .WithMany("Locations")
                        .HasForeignKey("RentACarName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Careoplane.Models.Price", b =>
                {
                    b.HasOne("Careoplane.Models.Airline", "Airline")
                        .WithMany("Prices")
                        .HasForeignKey("AirlineName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Careoplane.Models.PriceList", b =>
                {
                    b.HasOne("Careoplane.Models.RentACar", "RentACar")
                        .WithMany("Prices")
                        .HasForeignKey("RentACarName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Careoplane.Models.Seat", b =>
                {
                    b.HasOne("Careoplane.Models.Flight", "Flight")
                        .WithMany("Seats")
                        .HasForeignKey("FlightId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Careoplane.Models.SeatArrangement", b =>
                {
                    b.HasOne("Careoplane.Models.Airline", "Airline")
                        .WithMany("SeatingArrangements")
                        .HasForeignKey("AirlineName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Careoplane.Models.Segment", b =>
                {
                    b.HasOne("Careoplane.Models.Airline", "Airline")
                        .WithMany("SegmentLengths")
                        .HasForeignKey("AirlineName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Careoplane.Models.UnavailableDate", b =>
                {
                    b.HasOne("Careoplane.Models.Vehicle", "Vehicle")
                        .WithMany("UnavailableDates")
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Careoplane.Models.Vehicle", b =>
                {
                    b.HasOne("Careoplane.Models.RentACar", "RentACar")
                        .WithMany("Vehicles")
                        .HasForeignKey("RentACarName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Careoplane.Models.VehicleReservation", b =>
                {
                    b.HasOne("Careoplane.Models.Vehicle", "Vehicle")
                        .WithMany()
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
