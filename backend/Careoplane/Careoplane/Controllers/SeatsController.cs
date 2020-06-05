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
    public class SeatsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public SeatsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Seats
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TOSeat>>> GetSeats()
        {
            List<Seat> tempSeats = await _context.Seats.ToListAsync();
            List<TOSeat> returnSeats = new List<TOSeat>();
            tempSeats.ForEach(seat => returnSeats.Add(new TOSeat(seat)));
            return returnSeats;
        }

        // GET: api/Seats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TOSeat>> GetSeat(int id)
        {
            var seat = await _context.Seats.Include(x=>x.Flight).FirstOrDefaultAsync(s => s.SeatId == id);

            if (seat == null)
            {
                return NotFound();
            }

            return new TOSeat(seat);
        }

        // PUT: api/Seats/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSeat(int id, TOSeat seat)
        {
            if (id != seat.SeatId)
            {
                return BadRequest();
            }

            Seat oldSeat = await _context.Seats
                .Include(s => s.Flight).ThenInclude(f => f.Airline)
                .FirstOrDefaultAsync(s => s.SeatId == seat.SeatId);

            Seat tempSeat = new Seat(seat, _context);

            if(oldSeat.Discount == 0 && tempSeat.Discount != 0)
            {
                FastTicket fastTicket = new FastTicket()
                {
                    SeatId = tempSeat.SeatId,
                    Airline = tempSeat.Flight.Airline,
                    NewPrice = Math.Round(tempSeat.Price * (1 - (0.01 * tempSeat.Discount)))
                };
                _context.Add(fastTicket);
            }
            else if(seat.Discount == 0)
            {
                FastTicket fastTicket = await _context.FastTickets.FindAsync(tempSeat.SeatId);
                _context.Remove(fastTicket);
            }
            else
            {
                FastTicket oldFastTicket = await _context.FastTickets.FindAsync(tempSeat.SeatId);
                FastTicket fastTicket = new FastTicket()
                {
                    Airline = oldFastTicket.Airline,
                    SeatId = oldFastTicket.SeatId,
                    NewPrice = Math.Round(tempSeat.Price * (1 - (0.01 * tempSeat.Discount)))
                };
                _context.Entry(oldFastTicket).CurrentValues.SetValues(fastTicket);
            }

            _context.Entry(oldSeat).CurrentValues.SetValues(tempSeat);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SeatExists(id))
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

        // POST: api/Seats
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TOSeat>> PostSeat(TOSeat seat)
        {
            Seat tempSeat = new Seat(seat,_context);
            _context.Seats.Add(tempSeat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSeat", new { id = tempSeat.SeatId }, tempSeat);
        }

        // DELETE: api/Seats/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TOSeat>> DeleteSeat(int id)
        {
            var seat = await _context.Seats.FindAsync(id);
            if (seat == null)
            {
                return NotFound();
            }

            _context.Seats.Remove(seat);
            await _context.SaveChangesAsync();

            return new TOSeat(seat);
        }

        private bool SeatExists(int id)
        {
            return _context.Seats.Any(e => e.SeatId == id);
        }
    }
}
