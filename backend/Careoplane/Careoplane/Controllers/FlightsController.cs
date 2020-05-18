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
            List<Flight> flights = await _context.Flights.ToListAsync();
            List<TOFlight> returnList = new List<TOFlight>();
            flights.ForEach(flight => returnList.Add(new TOFlight(flight)));
            return returnList;
        }

        // GET: api/Flights/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TOFlight>> GetFlight(int id)
        {
            var flight = await _context.Flights.FindAsync(id);

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
        public async Task<IActionResult> PutFlight(int id, Flight flight)
        {
            if (id != flight.FlightId)
            {
                return BadRequest();
            }

            _context.Entry(flight).State = EntityState.Modified;

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

            return CreatedAtAction("GetFlight", new { id = tempFlight.FlightId }, tempFlight);
        }

        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TOFlight>> DeleteFlight(int id)
        {
            var flight = await _context.Flights.FindAsync(id);
            if (flight == null)
            {
                return NotFound();
            }

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();

            return new TOFlight(flight);
        }

        private bool FlightExists(int id)
        {
            return _context.Flights.Any(e => e.FlightId == id);
        }
    }
}
