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
    public class FlightReservationsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public FlightReservationsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/FlightReservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlightReservation>>> GetFlightReservations()
        {
            return await _context.FlightReservations.ToListAsync();
        }

        // GET: api/FlightReservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FlightReservation>> GetFlightReservation(int id)
        {
            var flightReservation = await _context.FlightReservations.FindAsync(id);

            if (flightReservation == null)
            {
                return NotFound();
            }

            return flightReservation;
        }

        // PUT: api/FlightReservations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlightReservation(int id, FlightReservation flightReservation)
        {
            if (id != flightReservation.ReservationId)
            {
                return BadRequest();
            }

            _context.Entry(flightReservation).State = EntityState.Modified;

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
        public async Task<ActionResult<FlightReservation>> PostFlightReservation(TOFlightReservation flightReservation)
        {
            FlightReservation tempFlightReservation = new FlightReservation()
            {
                ReservationId = 0
            };

            _context.FlightReservations.Add(tempFlightReservation);
            await _context.SaveChangesAsync();

            foreach (TOFlightReservationDetail tOFlightReservationDetail in flightReservation.FlightReservationDetails)
            {
                FlightReservationDetail flightReservationDetail = new FlightReservationDetail()
                {
                    FlightId = tOFlightReservationDetail.Flight.FlightId,
                    FlightReservation = tempFlightReservation,
                    FlightReservationDetailId = 0,
                };

                _context.Entry(flightReservationDetail).State = EntityState.Added;

                await _context.SaveChangesAsync();

                foreach (TOPassengerSeat tOPassengerSeat in tOFlightReservationDetail.PassengerSeats)
                {
                    PassengerSeat passengerSeat = new PassengerSeat()
                    {
                        SeatId = tOPassengerSeat.SeatId,
                        Surname = tOPassengerSeat.Surname,
                        PassengerSeatId = 0,
                        Name = tOPassengerSeat.Name,
                        Passport = tOPassengerSeat.Passport,
                        Username = tOPassengerSeat.Username,
                        FlightReservationDetail = flightReservationDetail
                    };

                    _context.Entry(passengerSeat).State = EntityState.Added;
                }

                await _context.SaveChangesAsync();
            }

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
