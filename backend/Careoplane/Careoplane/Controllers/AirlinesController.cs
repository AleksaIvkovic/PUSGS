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
using System.Security.Cryptography;

namespace Careoplane.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirlinesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public AirlinesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Airlines
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TOAirline>>> GetAirlines()
        {
            List<Airline> airlines = await _context.Airlines.ToListAsync();
            List<TOAirline> result = new List<TOAirline>();
            airlines.ForEach(airline => result.Add(new TOAirline(airline)));
            return result;
        }

        // GET: api/Airlines/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TOAirline>> GetAirline(string id)
        {
            var airline = await _context.Airlines.FindAsync(id);

            if (airline == null)
            {
                return NotFound();
            }

            return new TOAirline(airline);
        }

        // PUT: api/Airlines/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAirline(string id, Airline airline)
        {
            if (id != airline.Name)
            {
                return BadRequest();
            }

            _context.Entry(airline).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AirlineExists(id))
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

        // POST: api/Airlines
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TOAirline>> PostAirline(TOAirline airline)
        {
            Airline tempAirline = new Airline(airline);

            _context.Airlines.Add(tempAirline);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AirlineExists(tempAirline.Name))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            tempAirline.Destinations = new List<Destination>();
            foreach(var destination in airline.Destinations)
            {
                tempAirline.Destinations.Add(new Destination()
                {
                    Airline = tempAirline,
                    DestinationId = destination.Id,
                    Value = destination.Value.ToString()
                });
            }

            tempAirline.Prices = new List<Price>();
            foreach (var price in airline.Prices)
            {
                tempAirline.Prices.Add(new Price()
                {
                    Airline = tempAirline,
                    PriceId = price.Id,
                    Value = double.Parse(price.Value.ToString())
                });
            }

            tempAirline.SegmentLengths = new List<Segment>();
            foreach (var segment in airline.SegmentLengths)
            {
                tempAirline.SegmentLengths.Add(new Segment()
                {
                    Airline = tempAirline,
                    SegmentId = segment.Id,
                    Value = int.Parse(segment.Value.ToString())
                });
            }

            tempAirline.SeatingArrangements = new List<SeatArrangement>();
            foreach (var seatArrangement in airline.SeatingArrangements)
            {
                tempAirline.SeatingArrangements.Add(new SeatArrangement()
                {
                    Airline = tempAirline,
                    SeatArrangementId = seatArrangement.Id,
                    Value = int.Parse(seatArrangement.Value.ToString())
                });
            }

            _context.Entry(tempAirline).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAirline", new { id = tempAirline.Name }, tempAirline);
        }

        // DELETE: api/Airlines/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TOAirline>> DeleteAirline(string id)
        {
            var airline = await _context.Airlines.FindAsync(id);
            if (airline == null)
            {
                return NotFound();
            }

            _context.Airlines.Remove(airline);
            await _context.SaveChangesAsync();

            return new TOAirline(airline);
        }

        private bool AirlineExists(string id)
        {
            return _context.Airlines.Any(e => e.Name == id);
        }
    }
}
