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
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Careoplane.Services;
using Newtonsoft.Json.Linq;

namespace Careoplane.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightReservationsController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private UserManager<AppUser> _userManager;
        public FlightReservationsController(UserManager<AppUser> userManager, DatabaseContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/FlightReservations
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<TOFlightReservation>>> GetFlightReservations()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);

            var reservations = await _context.FlightReservations.Include(reservation => reservation.FlightReservationDetails).ThenInclude(details => details.PassengerSeats).ToListAsync();

            Dictionary<int, TOFlightReservation> varResult = new Dictionary<int, TOFlightReservation>();

            foreach(FlightReservation flightReservation in reservations)
            {
                foreach(FlightReservationDetail flightReservationDetail in flightReservation.FlightReservationDetails)
                {
                    foreach(PassengerSeat passengerSeat in flightReservationDetail.PassengerSeats)
                    {
                        if(passengerSeat.Username == user.UserName)
                        {
                            varResult.TryAdd(flightReservation.ReservationId,new TOFlightReservation(flightReservation, _context));
                        }
                    }
                }
            }

            return varResult.Values.ToList();
        }

        // GET: api/FlightReservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TOFlightReservation>> GetFlightReservation(int id)
        {
            FlightReservation flightReservation = await _context.FlightReservations
                .Include(reservation => reservation.FlightReservationDetails)
                .ThenInclude(details => details.PassengerSeats)
                .FirstOrDefaultAsync(reservation => reservation.ReservationId == id);

            if (flightReservation == null)
            {
                return NotFound();
            }

            return new TOFlightReservation(flightReservation,_context);
        }

        // PUT: api/FlightReservations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlightReservation(int id, JObject username)
        {
            var tempUsername = username["username"].ToString();

            var tempFlightReservation = await _context.FlightReservations.Include(reservation => reservation.FlightReservationDetails)
                .ThenInclude(details => details.PassengerSeats).FirstOrDefaultAsync(reservation => reservation.ReservationId == id);

            for(int i = 0; i < tempFlightReservation.FlightReservationDetails.Count; i++)
            {
                for(int j = 0; j < tempFlightReservation.FlightReservationDetails[i].PassengerSeats.Count; j++)
                {
                    if(tempFlightReservation.FlightReservationDetails[i].PassengerSeats[j].Username == tempUsername)
                    {
                        tempFlightReservation.FlightReservationDetails[i].PassengerSeats[j].Accepted = true;
                        _context.Entry(tempFlightReservation.FlightReservationDetails[i].PassengerSeats[j]).State = EntityState.Modified;
                    }
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightReservationExists(id))
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

        [HttpPut("Cancel/{id}")]
        public async Task<IActionResult> CancelFlightReservation(int id, JObject username)
        {
            var tempUsername = username["username"].ToString();

            var tempFlightReservation = await _context.FlightReservations.Include(reservation => reservation.FlightReservationDetails)
                .ThenInclude(details => details.PassengerSeats).FirstOrDefaultAsync(reservation => reservation.ReservationId == id);

            for (int i = 0; i < tempFlightReservation.FlightReservationDetails.Count; i++)
            {
                for (int j = 0; j < tempFlightReservation.FlightReservationDetails[i].PassengerSeats.Count; j++)
                {
                    if (tempFlightReservation.FlightReservationDetails[i].PassengerSeats[j].Username == tempUsername)
                    {
                        tempFlightReservation.FlightReservationDetails[i].PassengerSeats.RemoveAt(j);
                        break;
                    }
                }
            }

            if(tempFlightReservation.FlightReservationDetails[0].PassengerSeats.Count() != 0)
                _context.Entry(tempFlightReservation).State = EntityState.Modified;
            else
                _context.Entry(tempFlightReservation).State = EntityState.Deleted;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightReservationExists(id))
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

        // POST: api/FlightReservations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<FlightReservation>> PostFlightReservation(TOFlightReservation flightReservation)
        {
            TOFlight tempFlight = new TOFlight();

            FlightReservation tempFlightReservation = new FlightReservation()
            {
                ReservationId = 0
            };

            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var inviter = await _userManager.FindByIdAsync(userId);

            _context.FlightReservations.Add(tempFlightReservation);
            await _context.SaveChangesAsync();

            foreach (TOFlightReservationDetail tOFlightReservationDetail in flightReservation.FlightReservationDetails)
            {
                tempFlight = tOFlightReservationDetail.Flight;

                FlightReservationDetail flightReservationDetail = new FlightReservationDetail()
                {
                    FlightId = tOFlightReservationDetail.Flight.FlightId,
                    FlightReservation = tempFlightReservation,
                    FlightReservationDetailId = 0,
                    AirlineName = tOFlightReservationDetail.Flight.AirlineName
                };

                _context.Entry(flightReservationDetail).State = EntityState.Added;

                await _context.SaveChangesAsync();

                foreach (TOPassengerSeat tOPassengerSeat in tOFlightReservationDetail.PassengerSeats)
                {
                    PassengerSeat passengerSeat = new PassengerSeat()
                    {
                        SeatId = tOPassengerSeat.Seat.SeatId,
                        Surname = tOPassengerSeat.Surname,
                        PassengerSeatId = 0,
                        Name = tOPassengerSeat.Name,
                        Passport = tOPassengerSeat.Passport,
                        Username = tOPassengerSeat.Username,
                        FlightReservationDetail = flightReservationDetail,
                        AirlineScored = false,
                        FlightScored = false,
                    };

                    if (passengerSeat.Username != null && passengerSeat.Username == inviter.UserName)
                    {
                        passengerSeat.Accepted = true;
                    }
                    else
                    {
                        passengerSeat.Accepted = false;
                    }

                    _context.Entry(passengerSeat).State = EntityState.Added;

                    if(passengerSeat.Username != null && passengerSeat.Username != "" && passengerSeat.Username != inviter.UserName)
                    {
                        var user = await _userManager.FindByNameAsync(passengerSeat.Username);
                        MailingService.SendEMailInvite(inviter, user, tempFlightReservation, new Flight(tOFlightReservationDetail.Flight,_context));
                    }
                }

                await _context.SaveChangesAsync();
            }

            MailingService.SendEMailReceipt(inviter, tempFlightReservation, new Flight(tempFlight, _context));

            return CreatedAtAction("GetFlightReservation", new { id = flightReservation.ReservationId }, flightReservation);
        }

        // DELETE: api/FlightReservations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FlightReservation>> DeleteFlightReservation(int id)
        {
            var flightReservation = await _context.FlightReservations.FindAsync(id);
            if (flightReservation == null)
            {
                return NotFound();
            }

            _context.FlightReservations.Remove(flightReservation);
            await _context.SaveChangesAsync();

            return flightReservation;
        }

        private bool FlightReservationExists(int id)
        {
            return _context.FlightReservations.Any(e => e.ReservationId == id);
        }
    }
}
