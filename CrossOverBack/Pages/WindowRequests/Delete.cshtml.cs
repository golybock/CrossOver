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
    public class DeleteModel : PageModel
    {
        private readonly CrossOverBack.Models.CrossOverContext _context;

        public DeleteModel(CrossOverBack.Models.CrossOverContext context)
        {
            _context = context;
        }

        [BindProperty]
      public WindowRequest WindowRequest { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.WindowRequests == null)
            {
                return NotFound();
            }

            var windowrequest = await _context.WindowRequests.FirstOrDefaultAsync(m => m.Id == id);

            if (windowrequest == null)
            {
                return NotFound();
            }
            else 
            {
                WindowRequest = windowrequest;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null || _context.WindowRequests == null)
            {
                return NotFound();
            }
            var windowrequest = await _context.WindowRequests.FindAsync(id);

            if (windowrequest != null)
            {
                WindowRequest = windowrequest;
                _context.WindowRequests.Remove(WindowRequest);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
