using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Careoplane.Database;
using Careoplane.Models;
using Careoplane.TOModels;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;

namespace Careoplane.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public FlightsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Flights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TOFlight>>> GetFlights()
        {
            List<Flight> flights = await _context.Flights
                .Include(f => f.Connections)
                .Include(f => f.SeatingArrangements)
                .Include(f => f.SegmentLengths)
                .Include(f => f.Seats).ThenInclude(s => s.Flight)
                .Include(f => f.Airline).ThenInclude(a => a.Prices)
                .ToListAsync();
            List<TOFlight> returnList = new List<TOFlight>();
            flights.ForEach(flight => returnList.Add(new TOFlight(flight)));
            return returnList;
        }

        // GET: api/Flights/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TOFlight>> GetFlight(int id)
        {
            var flight = await _context.Flights
                .Include(f => f.Connections)
                .Include(f => f.SeatingArrangements)
                .Include(f => f.SegmentLengths)
                .Include(f => f.Seats).ThenInclude(s => s.Flight)
                .Include(f => f.Airline).ThenInclude(a => a.Prices)
                .FirstOrDefaultAsync(f => f.FlightId == id);

            if (flight == null)
            {
                return NotFound();
            }

            return new TOFlight(flight);
        }

        [HttpGet]
        [Route("Searched")]
        public async Task<ActionResult<IEnumerable<TOFlight>>> GetSearchedFlights([FromQuery]string origin, [FromQuery]string destination, [FromQuery]DateTime departure, [FromQuery]int numPassengers, [FromQuery]string classType, [FromQuery]string name, [FromQuery]bool notSingleAirline) {
            List<Flight> flights = await _context.Flights
                .Include(f => f.Connections)
                .Include(f => f.SeatingArrangements)
                .Include(f => f.SegmentLengths)
                .Include(f => f.Seats).ThenInclude(s => s.Flight)
                .Include(f => f.Airline).ThenInclude(a => a.Prices)
                .ToListAsync();

            List<TOFlight> returnList = new List<TOFlight>();
            foreach(Flight flight in flights)
            {
                if(flight.Origin == origin && flight.Destination == destination && flight.Departure.Date == departure.Date && (notSingleAirline || flight.Airline.Name == name))
                {
                    int count = 0;
                    foreach(Seat seat in flight.Seats)
                    {
                        if (seat.Type == classType || classType == "any")
                            if (!seat.Occupied)
                                count++;
                    }
                    if (count >= numPassengers)
                        returnList.Add(new TOFlight(flight));
                }
            }
            return returnList;
        }

        // PUT: api/Flights/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlight(int id, TOFlight flight)
        {
            if (id != flight.FlightId)
            {
                return BadRequest();
            }

            Flight tempFlight = new Flight(flight, _context);

            _context.Entry(tempFlight).State = EntityState.Modified;


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Flights
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TOFlight>> PostFlight(TOFlight flight)
        {
            Flight tempFlight = new Flight(flight, _context);
            _context.Flights.Add(tempFlight);
            await _context.SaveChangesAsync();

            tempFlight.Connections = new List<Connection>();
            foreach(TOPrimaryObject connection in flight.Connections)
            {
                tempFlight.Connections.Add(new Connection()
                {
                    ConntectionId = 0,
                    Flight = tempFlight,
                    Value = connection.Value.ToString()
                });
            }

            tempFlight.GenerateSeats();

            tempFlight.SegmentLengths = new List<SegmentFlight>();
            foreach (var segment in tempFlight.Airline.SegmentLengths)
            {
                tempFlight.SegmentLengths.Add(new SegmentFlight()
                {
                    Flight = tempFlight,
                    SegmentFlightId = 0,
                    Ordinal = segment.Ordinal,
                    Value = int.Parse(segment.Value.ToString())
                });
            }

            tempFlight.SeatingArrangements = new List<SeatArrangementFlight>();
            foreach (var seatArrangement in tempFlight.Airline.SeatingArrangements)
            {
                tempFlight.SeatingArrangements.Add(new SeatArrangementFlight()
                {
                    Flight = tempFlight,
                    SeatArrangementFlightId = 0,
                    Ordinal = seatArrangement.Ordinal,
                    Value = int.Parse(seatArrangement.Value.ToString())
                });
            }

            _context.Entry(tempFlight).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlight", new { id = tempFlight.FlightId }, new TOFlight(tempFlight));
        }

        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TOFlight>> DeleteFlight(int id)
        {
            var flight = await _context.Flights.Include(f => f.Airline).Include(f=>f.Connections).Include(f => f.Seats).ThenInclude(s => s.Flight).FirstOrDefaultAsync(f => f.FlightId == id);
            if (flight == null)
            {
                return NotFound();
            }

            TOFlight toFlight = new TOFlight(flight);

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();

            return toFlight;
        }

        private bool FlightExists(int id)
        {
            return _context.Flights.Any(e => e.FlightId == id);
        }
    }
}
