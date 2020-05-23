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

namespace Careoplane.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private Flight DBFlight;
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
                .Include(f => f.Seats).ThenInclude(s => s.Flight)
                .Include(f => f.Airline)
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
                .Include(f => f.Seats).ThenInclude(s => s.Flight)
                .Include(f => f.Airline)
                .FirstOrDefaultAsync(f => f.FlightId == id);

            if (flight == null)
            {
                return NotFound();
            }

            return new TOFlight(flight);
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

            Flight tempFlight = new Flight(flight,_context);

            Flight oldFlight = await _context.Flights
                .Include(f => f.Connections)
                .Include(f => f.Seats)
                .FirstOrDefaultAsync(f => f.FlightId == flight.FlightId);

            _context.Entry(oldFlight).CurrentValues.SetValues(tempFlight);

            #region connectins
            tempFlight.Connections = new List<Connection>();
            foreach (var connection in flight.Connections)
            {
                tempFlight.Connections.Add(new Connection()
                {
                    ConntectionId = connection.Id,
                    Flight = tempFlight,
                    Value = connection.Value.ToString()
                });
            }

            var connections = oldFlight.Connections.ToList();
            foreach (var connection in connections)
            {
                var conn = tempFlight.Connections.SingleOrDefault(i => i.ConntectionId == connection.ConntectionId);
                if (conn != null)
                    _context.Entry(connection).CurrentValues.SetValues(conn);
                else
                    _context.Remove(connection);
            }

            foreach (var conn in tempFlight.Connections)
            {
                if (connections.All(i => i.ConntectionId != conn.ConntectionId))
                {
                    oldFlight.Connections.Add(conn);
                }
            }
            #endregion

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
