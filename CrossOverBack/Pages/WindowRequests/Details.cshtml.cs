using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CrossOverBack.Models;

namespace CrossOverBack.Pages.WindowRequests
{
    public class DetailsModel : PageModel
    {
        private readonly CrossOverBack.Models.CrossOverContext _context;

        public DetailsModel(CrossOverBack.Models.CrossOverContext context)
        {
            _context = context;
        }

      public WindowRequest WindowRequest { get; set; } = default!; 

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.WindowRequests == null)
            {
                return NotFound();
            }

            var windowRequest = await _context.WindowRequests
                .Include(c => c.Window)
                .ThenInclude(c => c.WindowTypeNavigation)
                .Include(c => c.Window)
                .ThenInclude(c => c.ColorNavigation)
                .Include(c => c.Window)
                .ThenInclude(c => c.PacketNavigation)
                .Include(c => c.Window)
                .ThenInclude(c => c.WindowSections)
                .ThenInclude(c => c.SectionTypeNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (windowRequest == null)
            {
                return NotFound();
            }
            else
            {
                WindowRequest = windowRequest;
            }

            return Page();
        }
    }
}
