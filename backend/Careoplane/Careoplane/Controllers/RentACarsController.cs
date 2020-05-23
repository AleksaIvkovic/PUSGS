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
            List<RentACar> RentACarList = await _context.RentACars.Include(r => r.Locations).Include(r => r.Prices).Include(r => r.Vehicles).ToListAsync();
            List<TORentACar> TORentACarList = new List<TORentACar>();
            RentACarList.ForEach(rentACar => TORentACarList.Add(rentACar.ToTO()));

            return TORentACarList;
        }

        // GET: api/RentACars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TORentACar>> GetRentACar(string id)
        {
            var rentACar = await _context.RentACars.Include(r => r.Locations).Include(r => r.Prices).Include(r => r.Vehicles).FirstOrDefaultAsync(r => r.Name == id);

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
            RentACar rentACar = new RentACar();
            rentACar.FromTO(toRentACar);

            if (id != rentACar.Name)
            {
                return BadRequest();
            }

            _context.Entry(rentACar).State = EntityState.Modified;

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
