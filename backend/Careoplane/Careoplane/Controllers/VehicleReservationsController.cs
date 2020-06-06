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
    public class VehicleReservationsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public VehicleReservationsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/VehicleReservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TOVehicleReservation>>> GetVehicleReservation()
        {
            List<VehicleReservation> VehicleReservationList = await _context.VehicleReservation.ToListAsync();
            List<TOVehicleReservation> TOVehicleReservationList = new List<TOVehicleReservation>();
            VehicleReservationList.ForEach(reservation => TOVehicleReservationList.Add(reservation.ToTO()));

            return TOVehicleReservationList;
        }

        [HttpGet]
        [Route("ForVehicles")]
        public async Task<ActionResult<IEnumerable<TOVehicleReservation>>> GetVehicleReservationsForVehicles([FromQuery]string vehicleIds)
        {
            List<int> ids = new List<int>();
            string[] stringIds = vehicleIds.Split(',');
            List<VehicleReservation> VehicleReservationList = new List<VehicleReservation>();

            for (int i = 0; i < stringIds.Count() - 1; i++)
            {
                var tempList = await _context.VehicleReservation.Where(vehicleReservation => vehicleReservation.VehicleId == int.Parse(stringIds[i])).ToListAsync();
                VehicleReservationList.AddRange(tempList);
            }

            List<TOVehicleReservation> TOVehicleReservationList = new List<TOVehicleReservation>();
            VehicleReservationList.ForEach(reservation => TOVehicleReservationList.Add(reservation.ToTO()));

            return TOVehicleReservationList;
        }

        // GET: api/VehicleReservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TOVehicleReservation>> GetVehicleReservation(int id)
        {
            var vehicleReservation = await _context.VehicleReservation.FindAsync(id);

            if (vehicleReservation == null)
            {
                return NotFound();
            }

            return vehicleReservation.ToTO();
        }

        // PUT: api/VehicleReservations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicleReservation(int id, TOVehicleReservation toVehicleReservation)
        {
            VehicleReservation vehicleReservation = new VehicleReservation();
            vehicleReservation.FromTO(toVehicleReservation);

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
        public async Task<ActionResult<TOVehicleReservation>> PostVehicleReservation(TOVehicleReservation toVehicleReservation)
        {
            VehicleReservation vehicleReservation = new VehicleReservation();
            vehicleReservation.FromTO(toVehicleReservation);

            _context.VehicleReservation.Add(vehicleReservation);
            await _context.SaveChangesAsync();

            //Treba popuniti Unavailable Dates
            Vehicle vehicle = await _context.Vehicles.Include(v => v.UnavailableDates).FirstOrDefaultAsync(v=> v.VehicleId == vehicleReservation.VehicleId);

            for (int i = 0; i < vehicleReservation.NumOfDays; i++)
            {
                vehicle.UnavailableDates.Add(new UnavailableDate()
                {
                    DateId = 0,
                    Vehicle = vehicle,
                    Date = vehicleReservation.FromDate.AddDays(i)
                });
            }
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/VehicleReservations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TOVehicleReservation>> DeleteVehicleReservation(int id)
        {
            var vehicleReservation = await _context.VehicleReservation.FindAsync(id);
            if (vehicleReservation == null)
            {
                return NotFound();
            }

            _context.VehicleReservation.Remove(vehicleReservation);
            await _context.SaveChangesAsync();

            return vehicleReservation.ToTO();
        }

        private bool VehicleReservationExists(int id)
        {
            return _context.VehicleReservation.Any(e => e.ReservationId == id);
        }
    }
}
