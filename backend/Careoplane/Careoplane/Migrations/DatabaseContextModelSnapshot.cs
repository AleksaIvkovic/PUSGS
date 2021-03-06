﻿// <auto-generated />
using System;
using Careoplane.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Careoplane.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

                    b.Property<double>("Rating")
                        .HasColumnType("float");

                    b.HasKey("Name");

                    b.ToTable("Airlines");
                });

            modelBuilder.Entity("Careoplane.Models.ArilineRating", b =>
                {
                    b.Property<int>("AirlineRatingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AirlineName")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Value")
                        .HasColumnType("int");

                    b.HasKey("AirlineRatingId");

                    b.HasIndex("AirlineName");

                    b.ToTable("ArilineRating");
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

            modelBuilder.Entity("Careoplane.Models.Discount", b =>
                {
                    b.Property<int>("DiscountId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("DiscountValue")
                        .HasColumnType("float");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("DiscountId");

                    b.ToTable("Discount");
                });

            modelBuilder.Entity("Careoplane.Models.FastTicket", b =>
                {
                    b.Property<int>("SeatId")
                        .HasColumnType("int");

                    b.Property<string>("AirlineName")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("NewPrice")
                        .HasColumnType("float");

                    b.HasKey("SeatId");

                    b.HasIndex("AirlineName");

                    b.ToTable("FastTickets");
                });

            modelBuilder.Entity("Careoplane.Models.Flight", b =>
                {
                    b.Property<int>("FlightId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AirlineName")
                        .IsRequired()
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

                    b.Property<int>("Version")
                        .HasColumnType("int");

                    b.HasKey("FlightId");

                    b.HasIndex("AirlineName");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("Careoplane.Models.FlightRating", b =>
                {
                    b.Property<int>("FlightRatingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FlightId")
                        .HasColumnType("int");

                    b.Property<int>("Value")
                        .HasColumnType("int");

                    b.HasKey("FlightRatingId");

                    b.HasIndex("FlightId");

                    b.ToTable("FlightRating");
                });

            modelBuilder.Entity("Careoplane.Models.FlightReservation", b =>
                {
                    b.Property<int>("ReservationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Creator")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("FinalPrice")
                        .HasColumnType("float");

                    b.Property<DateTime>("TimeOfCreation")
                        .HasColumnType("datetime2");

                    b.Property<int>("VehicleReservationId")
                        .HasColumnType("int");

                    b.HasKey("ReservationId");

                    b.ToTable("FlightReservations");
                });

            modelBuilder.Entity("Careoplane.Models.FlightReservationDetail", b =>
                {
                    b.Property<int>("FlightReservationDetailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AirlineName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FlightId")
                        .HasColumnType("int");

                    b.Property<int>("FlightReservationReservationId")
                        .HasColumnType("int");

                    b.HasKey("FlightReservationDetailId");

                    b.HasIndex("FlightReservationReservationId");

                    b.ToTable("FlightReservationDetail");
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

            modelBuilder.Entity("Careoplane.Models.PassengerSeat", b =>
                {
                    b.Property<int>("PassengerSeatId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Accepted")
                        .HasColumnType("bit");

                    b.Property<bool>("AirlineScored")
                        .HasColumnType("bit");

                    b.Property<int>("FlightReservationDetailId")
                        .HasColumnType("int");

                    b.Property<bool>("FlightScored")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Passport")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SeatId")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PassengerSeatId");

                    b.HasIndex("FlightReservationDetailId");

                    b.ToTable("PassengerSeat");
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

                    b.Property<int>("Ordinal")
                        .HasColumnType("int");

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

            modelBuilder.Entity("Careoplane.Models.RentACarRating", b =>
                {
                    b.Property<int>("RentACarRatingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("RentACarName")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("RentACarRatingValue")
                        .HasColumnType("int");

                    b.HasKey("RentACarRatingId");

                    b.HasIndex("RentACarName");

                    b.ToTable("RentACarRating");
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

                    b.Property<int>("Ordinal")
                        .HasColumnType("int");

                    b.Property<double>("Value")
                        .HasColumnType("float");

                    b.HasKey("SeatArrangementId");

                    b.HasIndex("AirlineName");

                    b.ToTable("SeatArrangement");
                });

            modelBuilder.Entity("Careoplane.Models.SeatArrangementFlight", b =>
                {
                    b.Property<int>("SeatArrangementFlightId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FlightId")
                        .HasColumnType("int");

                    b.Property<int>("Ordinal")
                        .HasColumnType("int");

                    b.Property<double>("Value")
                        .HasColumnType("float");

                    b.HasKey("SeatArrangementFlightId");

                    b.HasIndex("FlightId");

                    b.ToTable("SeatArrangementFlight");
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

                    b.Property<int>("Ordinal")
                        .HasColumnType("int");

                    b.Property<double>("Value")
                        .HasColumnType("float");

                    b.HasKey("SegmentId");

                    b.HasIndex("AirlineName");

                    b.ToTable("Segment");
                });

            modelBuilder.Entity("Careoplane.Models.SegmentFlight", b =>
                {
                    b.Property<int>("SegmentFlightId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FlightId")
                        .HasColumnType("int");

                    b.Property<int>("Ordinal")
                        .HasColumnType("int");

                    b.Property<double>("Value")
                        .HasColumnType("float");

                    b.HasKey("SegmentFlightId");

                    b.HasIndex("FlightId");

                    b.ToTable("SegmentFlight");
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

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Version")
                        .HasColumnType("int");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("VehicleId");

                    b.HasIndex("RentACarName");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("Careoplane.Models.VehicleRating", b =>
                {
                    b.Property<int>("VehicleRatingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("VehicleId")
                        .HasColumnType("int");

                    b.Property<int>("VehicleRatingValue")
                        .HasColumnType("int");

                    b.HasKey("VehicleRatingId");

                    b.HasIndex("VehicleId");

                    b.ToTable("VehicleRating");
                });

            modelBuilder.Entity("Careoplane.Models.VehicleReservation", b =>
                {
                    b.Property<int>("ReservationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("FromDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("FromLocation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsRentACarRated")
                        .HasColumnType("bit");

                    b.Property<bool>("IsVehicleRated")
                        .HasColumnType("bit");

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

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VehicleId")
                        .HasColumnType("int");

                    b.HasKey("ReservationId");

                    b.ToTable("VehicleReservation");
                });

            modelBuilder.Entity("Careoplane.Models.ArilineRating", b =>
                {
                    b.HasOne("Careoplane.Models.Airline", "Airline")
                        .WithMany("Ratings")
                        .HasForeignKey("AirlineName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
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
                    b.HasOne("Careoplane.Models.Airline", "Airline")
                        .WithMany("FastTickets")
                        .HasForeignKey("AirlineName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Careoplane.Models.Flight", b =>
                {
                    b.HasOne("Careoplane.Models.Airline", "Airline")
                        .WithMany("Flights")
                        .HasForeignKey("AirlineName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Careoplane.Models.FlightRating", b =>
                {
                    b.HasOne("Careoplane.Models.Flight", "Flight")
                        .WithMany("Ratings")
                        .HasForeignKey("FlightId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Careoplane.Models.FlightReservationDetail", b =>
                {
                    b.HasOne("Careoplane.Models.FlightReservation", "FlightReservation")
                        .WithMany("FlightReservationDetails")
                        .HasForeignKey("FlightReservationReservationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Careoplane.Models.Location", b =>
                {
                    b.HasOne("Careoplane.Models.RentACar", "RentACar")
                        .WithMany("Locations")
                        .HasForeignKey("RentACarName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Careoplane.Models.PassengerSeat", b =>
                {
                    b.HasOne("Careoplane.Models.FlightReservationDetail", "FlightReservationDetail")
                        .WithMany("PassengerSeats")
                        .HasForeignKey("FlightReservationDetailId")
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

            modelBuilder.Entity("Careoplane.Models.RentACarRating", b =>
                {
                    b.HasOne("Careoplane.Models.RentACar", "RentACar")
                        .WithMany("Ratings")
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

            modelBuilder.Entity("Careoplane.Models.SeatArrangementFlight", b =>
                {
                    b.HasOne("Careoplane.Models.Flight", "Flight")
                        .WithMany("SeatingArrangements")
                        .HasForeignKey("FlightId")
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

            modelBuilder.Entity("Careoplane.Models.SegmentFlight", b =>
                {
                    b.HasOne("Careoplane.Models.Flight", "Flight")
                        .WithMany("SegmentLengths")
                        .HasForeignKey("FlightId")
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

            modelBuilder.Entity("Careoplane.Models.VehicleRating", b =>
                {
                    b.HasOne("Careoplane.Models.Vehicle", "Vehicle")
                        .WithMany("Ratings")
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
