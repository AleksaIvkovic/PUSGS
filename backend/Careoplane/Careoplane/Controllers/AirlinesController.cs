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
            List<Airline> airlines = await _context.Airlines
                .Include(a => a.Destinations)
                .Include(a => a.SeatingArrangements)
                .Include(a => a.SegmentLengths)
                .Include(a => a.Prices)
                .Include(a => a.Flights).ThenInclude(f => f.Seats)
                .Include(a => a.Flights).ThenInclude(f => f.Connections)
                .Include(a => a.Flights).ThenInclude(f => f.SeatingArrangements)
                .Include(a => a.Flights).ThenInclude(f => f.SegmentLengths)
                .Include(a => a.FastTickets)
                .ToListAsync();
            List<TOAirline> result = new List<TOAirline>();
            airlines.ForEach(airline => result.Add(new TOAirline(airline)));
            return result;
        }

        // GET: api/Airlines/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TOAirline>> GetAirline(string id)
        {
            var airline = await _context.Airlines
                .Include(a => a.Destinations)
                .Include(a => a.SeatingArrangements)
                .Include(a => a.SegmentLengths)
                .Include(a => a.Prices)
                .Include(a => a.Flights).ThenInclude(f => f.Seats)
                .Include(a => a.Flights).ThenInclude(f => f.Connections)   
                .Include(a => a.Flights).ThenInclude(f => f.SeatingArrangements)
                .Include(a => a.Flights).ThenInclude(f => f.SegmentLengths)
                .Include(a => a.FastTickets)
                .FirstOrDefaultAsync(a => a.Name == id);

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
        public async Task<IActionResult> PutAirline(string id, TOAirline airline)
        {
            if (id != airline.Name)
            {
                return BadRequest();
            }

            Airline tempAirline = new Airline(airline);

            Airline oldAirline = await _context.Airlines
                .Include(c => c.Destinations)
                .Include(c => c.SeatingArrangements)
                .Include(c => c.SegmentLengths)
                .Include(c => c.Prices)
                .FirstOrDefaultAsync(c => c.Name == airline.Name);

            _context.Entry(oldAirline).CurrentValues.SetValues(tempAirline);

            #region destinations
            tempAirline.Destinations = new List<Destination>();
            foreach (var destination in airline.Destinations)
            {
                tempAirline.Destinations.Add(new Destination()
                {
                    Airline = tempAirline,
                    DestinationId = destination.Id,
                    Value = destination.Value.ToString()
                });
            }

            var destinations = oldAirline.Destinations.ToList();
            foreach (var destination in destinations)
            {
                var des = tempAirline.Destinations.SingleOrDefault(i => i.DestinationId == destination.DestinationId);
                if (des != null)
                    _context.Entry(destination).CurrentValues.SetValues(des);
                else
                    _context.Remove(destination);
            }

            foreach (var des in tempAirline.Destinations)
            {
                if (destinations.All(i => i.DestinationId != des.DestinationId))
                {
                    oldAirline.Destinations.Add(des);
                }
            }
            #endregion

            #region prices
            tempAirline.Prices = new List<Price>();
            foreach (var price in airline.Prices)
            {
                tempAirline.Prices.Add(new Price()
                {
                    Airline = tempAirline,
                    PriceId = price.Id,
                    Value = double.Parse(price.Value.ToString()),
                    Ordinal = price.Ordinal
                });
            }

            var prices = oldAirline.Prices.ToList();
            foreach (var price in prices)
            {
                var pri = tempAirline.Prices.SingleOrDefault(i => i.PriceId == price.PriceId);
                if (pri != null)
                    _context.Entry(price).CurrentValues.SetValues(pri);
                else
                    _context.Remove(price);
            }

            foreach (var pri in tempAirline.Prices)
            {
                if (prices.All(i => i.PriceId != pri.PriceId))
                {
                    oldAirline.Prices.Add(pri);
                }
            }
            #endregion region

            #region segmentLength
            tempAirline.SegmentLengths = new List<Segment>();
            foreach (var segment in airline.SegmentLengths)
            {
                tempAirline.SegmentLengths.Add(new Segment()
                {
                    Airline = tempAirline,
                    SegmentId = segment.Id,
                    Value = int.Parse(segment.Value.ToString()),
                    Ordinal = segment.Ordinal
                });
            }

            var segmentLengths = oldAirline.SegmentLengths.ToList();
            foreach (var segmentLength in segmentLengths)
            {
                var segLen = tempAirline.SegmentLengths.SingleOrDefault(i => i.SegmentId == segmentLength.SegmentId);
                if (segLen != null)
                    _context.Entry(segmentLength).CurrentValues.SetValues(segLen);
                else
                    _context.Remove(segmentLength);
            }

            foreach (var segLen in tempAirline.SegmentLengths)
            {
                if (segmentLengths.All(i => i.SegmentId != segLen.SegmentId))
                {
                    oldAirline.SegmentLengths.Add(segLen);
                }
            }
            #endregion

            #region Seat
            tempAirline.SeatingArrangements = new List<SeatArrangement>();
            foreach (var seatArrangement in airline.SeatingArrangements)
            {
                tempAirline.SeatingArrangements.Add(new SeatArrangement()
                {
                    Airline = tempAirline,
                    SeatArrangementId = seatArrangement.Id,
                    Value = int.Parse(seatArrangement.Value.ToString()),
                    Ordinal = seatArrangement.Ordinal
                });
            }

            var seats = oldAirline.SeatingArrangements.ToList();
            foreach (var seat in seats)
            {
                var se = tempAirline.SeatingArrangements.SingleOrDefault(i => i.SeatArrangementId == seat.SeatArrangementId);
                if (se != null)
                    _context.Entry(seat).CurrentValues.SetValues(se);
                else
                    _context.Remove(seat);
            }

            foreach (var se in tempAirline.SeatingArrangements)
            {
                if (seats.All(i => i.SeatArrangementId != se.SeatArrangementId))
                {
                    oldAirline.SeatingArrangements.Add(se);
                }
            }
            #endregion

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
                    Ordinal = price.Ordinal,
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
                    Ordinal = segment.Ordinal,
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
                    Ordinal = seatArrangement.Ordinal,
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
