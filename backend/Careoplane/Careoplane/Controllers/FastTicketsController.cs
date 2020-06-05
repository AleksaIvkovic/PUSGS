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
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Careoplane.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FastTicketsController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private UserManager<AppUser> _userManager;

        public FastTicketsController(UserManager<AppUser> userManager, DatabaseContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        // GET: api/FastTickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FastTicket>>> GetFastTickets()
        {
            return await _context.FastTickets.ToListAsync();
        }

        // GET: api/FastTickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FastTicket>> GetFastTicket(int id)
        {
            var fastTicket = await _context.FastTickets.FindAsync(id);

            if (fastTicket == null)
            {
                return NotFound();
            }

            return fastTicket;
        }

        // PUT: api/FastTickets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutFastTicket(int id, [FromBody]JObject Obj)
        {
            TOFastTicket fastTicket = Obj["fastTicket"].ToObject<TOFastTicket>();
            bool occupied = Obj["occupied"].ToObject<bool>();

            if (id != fastTicket.Seat.SeatId)
            {
                return BadRequest();
            }

            Seat seat = await _context.Seats.Include(seat => seat.Flight).FirstAsync(seat => seat.SeatId == fastTicket.Seat.SeatId);
            seat.Occupied = occupied;

            _context.Entry(seat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                var user = await _userManager.FindByIdAsync(userId);

                if (occupied == true)
                {
                    FlightReservation flightReservation = new FlightReservation()
                    {
                        ReservationId = 0
                    };

                    FlightReservationDetail flightReservationDetail = new FlightReservationDetail()
                    {
                        FlightReservation = flightReservation,
                        FlightReservationDetailId = 0,
                        FlightId = seat.Flight.FlightId
                    };

                    PassengerSeat passengerSeat = new PassengerSeat()
                    {
                        PassengerSeatId = 0,
                        FlightReservationDetail = flightReservationDetail,
                        SeatId = seat.SeatId,
                        Username = user.UserName
                    };

                    flightReservationDetail.PassengerSeats = new List<PassengerSeat>();
                    flightReservationDetail.PassengerSeats.Add(passengerSeat);

                    flightReservation.FlightReservationDetails = new List<FlightReservationDetail>();
                    flightReservation.FlightReservationDetails.Add(flightReservationDetail);

                    _context.FlightReservations.Add(flightReservation);

                    await _context.SaveChangesAsync();
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FastTicketExists(id))
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

        // POST: api/FastTickets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FastTicket>> PostFastTicket(FastTicket fastTicket)
        {
            _context.FastTickets.Add(fastTicket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFastTicket", new { id = fastTicket.SeatId }, fastTicket);
        }

        // DELETE: api/FastTickets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FastTicket>> DeleteFastTicket(int id)
        {
            var fastTicket = await _context.FastTickets.FindAsync(id);
            if (fastTicket == null)
            {
                return NotFound();
            }

            _context.FastTickets.Remove(fastTicket);
            await _context.SaveChangesAsync();

            return fastTicket;
        }

        private bool FastTicketExists(int id)
        {
            return _context.FastTickets.Any(e => e.SeatId == id);
        }
    }
}
