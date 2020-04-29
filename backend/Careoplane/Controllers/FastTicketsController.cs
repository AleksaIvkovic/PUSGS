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
    public class FastTicketsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public FastTicketsController(DatabaseContext context)
        {
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
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFastTicket(int id, FastTicket fastTicket)
        {
            if (id != fastTicket.FastTicketId)
            {
                return BadRequest();
            }

            _context.Entry(fastTicket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<FastTicket>> PostFastTicket(FastTicket fastTicket)
        {
            _context.FastTickets.Add(fastTicket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFastTicket", new { id = fastTicket.FastTicketId }, fastTicket);
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
            return _context.FastTickets.Any(e => e.FastTicketId == id);
        }
    }
}
