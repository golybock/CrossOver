using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CrossOverBack.Models;

namespace CrossOverBack.Pages.Requests
{
    public class DeleteModel : PageModel
    {
        private readonly CrossOverBack.Models.CrossOverContext _context;

        public DeleteModel(CrossOverBack.Models.CrossOverContext context)
        {
            _context = context;
        }

        [BindProperty]
      public CallRequest CallRequest { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.CallRequests == null)
            {
                return NotFound();
            }

            var callrequest = await _context.CallRequests.FirstOrDefaultAsync(m => m.Id == id);

            if (callrequest == null)
            {
                return NotFound();
            }
            else 
            {
                CallRequest = callrequest;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null || _context.CallRequests == null)
            {
                return NotFound();
            }
            var callrequest = await _context.CallRequests.FindAsync(id);

            if (callrequest != null)
            {
                CallRequest = callrequest;
                _context.CallRequests.Remove(CallRequest);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
