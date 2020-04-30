using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Careoplane.Database;
using Careoplane.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<IEnumerable<RentACar>>> GetRentACars()
        {
            return await _context.RentACars.ToListAsync();
        }

        // GET: api/RentACars/id
        [HttpGet("{id}")]
        public async Task<ActionResult<RentACar>> GetRentACars(string id)
        {
            var rentACar = await _context.RentACars.FindAsync(id);

            if (rentACar == null)
            {
                return NotFound();
            }

            return rentACar;
        }

        // PUT: api/RentACars/id
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [Route("UpdateRentACar")]
        public async Task<IActionResult> UpdateRentACar(RentACar rentACar)
        {
            _context.Entry(rentACar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentACarsExists(rentACar.Name))
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
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("AddRentACar")]
        public async Task<ActionResult<RentACar>> AddRentACar(RentACar rentACar)
        {

            _context.RentACars.Add(rentACar);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRentACars", new { id = rentACar.Name }, rentACar);
        }

        // DELETE: api/RentACars/id
        [HttpDelete]
        [Route("DeleteRentACar/{id}")]
        public async Task<ActionResult<RentACar>> DeleteRentACar(int id)
        {
            var rentACar = await _context.RentACars.FindAsync(id);
            if (rentACar == null)
            {
                return NotFound();
            }

            _context.RentACars.Remove(rentACar);
            await _context.SaveChangesAsync();

            return rentACar;
        }

        private bool RentACarsExists(string id)
        {
            return _context.RentACars.Any(e => e.Name == id);
        }
    }
}