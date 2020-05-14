using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Careoplane.Database;
using Careoplane.Models;

namespace Careoplane.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleReservationsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public VehicleReservationsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/VehicleReservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleReservation>>> GetVehicleReservation()
        {
            return await _context.VehicleReservation.ToListAsync();
        }

        // GET: api/VehicleReservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleReservation>> GetVehicleReservation(int id)
        {
            var vehicleReservation = await _context.VehicleReservation.FindAsync(id);

            if (vehicleReservation == null)
            {
                return NotFound();
            }

            return vehicleReservation;
        }

        // PUT: api/VehicleReservations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicleReservation(int id, VehicleReservation vehicleReservation)
        {
            if (id != vehicleReservation.ReservationId)
            {
                return BadRequest();
            }

            _context.Entry(vehicleReservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleReservationExists(id))
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

        // POST: api/VehicleReservations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<VehicleReservation>> PostVehicleReservation(VehicleReservation vehicleReservation)
        {
            _context.VehicleReservation.Add(vehicleReservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVehicleReservation", new { id = vehicleReservation.ReservationId }, vehicleReservation);
        }

        // DELETE: api/VehicleReservations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<VehicleReservation>> DeleteVehicleReservation(int id)
        {
            var vehicleReservation = await _context.VehicleReservation.FindAsync(id);
            if (vehicleReservation == null)
            {
                return NotFound();
            }

            _context.VehicleReservation.Remove(vehicleReservation);
            await _context.SaveChangesAsync();

            return vehicleReservation;
        }

        private bool VehicleReservationExists(int id)
        {
            return _context.VehicleReservation.Any(e => e.ReservationId == id);
        }
    }
}
