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
    public class IndexModel : PageModel
    {
        private readonly CrossOverBack.Models.CrossOverContext _context;

        public IndexModel(CrossOverBack.Models.CrossOverContext context)
        {
            _context = context;
        }

        public IList<WindowRequest> WindowRequest { get;set; } = default!;

        public async Task OnGetAsync()
        {
            if (_context.WindowRequests != null)
            {
                WindowRequest = await _context.WindowRequests
                .Include(w => w.Window).ToListAsync();
            }
        }
    }
}
