using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Careoplane.Database;
using Careoplane.Models;
using Microsoft.AspNetCore.Cors;
using Careoplane.TOModels;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.AspNetCore.Http.Connections;

namespace Careoplane.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentACarsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public RentACarsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/RentACars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TORentACar>>> GetRentACars()
        {
            List<RentACar> RentACarList = await _context.RentACars
                .Include(rentACar => rentACar.Locations)
                .Include(rentACar => rentACar.Prices)
                .Include(rentACar => rentACar.Vehicles)
                .ThenInclude(vehicle => vehicle.UnavailableDates).ToListAsync();
            List<TORentACar> TORentACarList = new List<TORentACar>();
            RentACarList.ForEach(rentACar => TORentACarList.Add(rentACar.ToTO()));

            return TORentACarList;
        }

        // GET: api/RentACars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TORentACar>> GetRentACar(string id)
        {
            var rentACar = await _context.RentACars.Include(r => r.Locations).Include(r => r.Prices).Include(r => r.Vehicles).ThenInclude(v => v.UnavailableDates).FirstOrDefaultAsync(r => r.Name == id);

            if (rentACar == null)
            {
                return NotFound();
            }

            return rentACar.ToTO();
        }

        // PUT: api/RentACars/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRentACar(string id, TORentACar toRentACar)
        {
            var rentACar = await _context.RentACars.Include(r => r.Locations).Include(r => r.Prices).FirstOrDefaultAsync(r => r.Name == id);

            RentACar modifiedRentACar = new RentACar();
            modifiedRentACar.FromTO(toRentACar);

            if (id != rentACar.Name)
            {
                return BadRequest();
            }

            //_context.Entry(rentACar).State = EntityState.Modified;
            _context.Entry(rentACar).CurrentValues.SetValues(modifiedRentACar);

            #region Update Locations

            var locations = rentACar.Locations.ToList(); //Lokacije iz baze
            foreach (var location in locations)
            {
                var loc = toRentACar.Locations.SingleOrDefault(l => l.Value.ToString() == location.LocationValue); //Ako ne postoji u bazi ta lokacija, ukloni je
                if (loc == null)
                {
                    _context.Remove(location);
                }
            }
            // add the new items
            foreach (var location in toRentACar.Locations.ToList()) //Nove lokacije
            {
                if (locations.All(l => l.LocationValue != location.Value.ToString())) //Ako sve lokacije nisu jednake novoj lokaciji, dodaj je
                {
                    rentACar.Locations.Add(new Location()
                    {
                        LocationId = 0,
                        LocationValue = location.Value.ToString(),
                        RentACar = rentACar
                    });
                }
            }

            #endregion

            #region Update Prices

            var prices = rentACar.Prices.ToList(); //Cene iz baze
            var carPrice = prices.SingleOrDefault(p => p.PriceService == "Car");
            carPrice.PriceValue = (Int64)toRentACar.Prices.ToList()[0].Value;
            var vanPrice = prices.SingleOrDefault(p => p.PriceService == "Van");
            vanPrice.PriceValue = (Int64)toRentACar.Prices.ToList()[1].Value;
            var truckPrice = prices.SingleOrDefault(p => p.PriceService == "Truck");
            truckPrice.PriceValue = (Int64)toRentACar.Prices.ToList()[2].Value;

            _context.Entry(prices[0]).CurrentValues.SetValues(carPrice);
            _context.Entry(prices[1]).CurrentValues.SetValues(vanPrice);
            _context.Entry(prices[2]).CurrentValues.SetValues(truckPrice);

            #endregion

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentACarExists(id))
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

        // POST: api/RentACars
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TORentACar>> PostRentACar(TORentACar toRentACar)
        {
            RentACar rentACar = new RentACar();
            rentACar.FromTO(toRentACar);

            _context.RentACars.Add(rentACar);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RentACarExists(rentACar.Name))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRentACar", new { id = toRentACar.Name }, toRentACar);
        }

        // DELETE: api/RentACars/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TORentACar>> DeleteRentACar(string id)
        {
            var rentACar = await _context.RentACars.FindAsync(id);
            if (rentACar == null)
            {
                return NotFound();
            }

            _context.RentACars.Remove(rentACar);
            await _context.SaveChangesAsync();

            return rentACar.ToTO();
        }

        private bool RentACarExists(string id)
        {
            return _context.RentACars.Any(e => e.Name == id);
        }
    }
}
