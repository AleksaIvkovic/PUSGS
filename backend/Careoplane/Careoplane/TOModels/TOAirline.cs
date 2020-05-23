using Careoplane.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Careoplane.TOModels
{
    public class TOAirline
    {
        public string Name { get; set; }

        public string Address { get; set; }

        public string Description { get; set; }

        public List<TOPrimaryObject> Prices { get; set; }

        public List<TOPrimaryObject> SeatingArrangements { get; set; }

        public List<TOPrimaryObject> SegmentLengths { get; set; }

        public List<TOFlight> Flights { get; set; }

        public string Image { get; set; }

        public decimal Rating { get; set; }

        public List<TOPrimaryObject> Destinations { get; set; }

        public List<TOFastTicket> FastTickets { get; set; }

        public TOAirline() { }
        public TOAirline(Airline airline)
        {
            Name = airline.Name;
            Address = airline.Address;
            Description = airline.Description;
            Image = airline.Image;
            Rating = airline.Rating;

            FastTickets = new List<TOFastTicket>();

            if(airline.FastTickets != null)
                foreach(FastTicket fastTicket in airline.FastTickets)
                {
                    FastTickets.Add(new TOFastTicket(fastTicket));
                }

            Destinations = new List<TOPrimaryObject>();
            if(airline.Destinations != null)
                foreach(Destination destination in airline.Destinations)
                {
                    Destinations.Add(new TOPrimaryObject(destination.DestinationId, destination.Value, destination.Airline.Name));
                }

            Prices = new List<TOPrimaryObject>();
            if(airline.Prices != null)
                foreach (Price price in airline.Prices)
                {
                    Prices.Add(new TOPrimaryObject(price.PriceId, price.Value, price.Airline.Name));
                }

            SegmentLengths = new List<TOPrimaryObject>();
            if(airline.SegmentLengths != null) 
                foreach (Segment destination in airline.SegmentLengths)
                {
                    SegmentLengths.Add(new TOPrimaryObject(destination.SegmentId, destination.Value, destination.Airline.Name));
                }

            SeatingArrangements = new List<TOPrimaryObject>();
            if (airline.SeatingArrangements != null)
                foreach (SeatArrangement destination in airline.SeatingArrangements)
                {
                    SeatingArrangements.Add(new TOPrimaryObject(destination.SeatArrangementId, destination.Value, destination.Airline.Name));
                }

            Flights = new List<TOFlight>();
            if (airline.Flights != null)
                foreach (Flight flight in airline.Flights)
                {
                    Flights.Add(new TOFlight(flight));
                }
        }
    }
}
