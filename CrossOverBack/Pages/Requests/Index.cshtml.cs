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
    public class IndexModel : PageModel
    {
        private readonly CrossOverBack.Models.CrossOverContext _context;

        public IndexModel(CrossOverBack.Models.CrossOverContext context)
        {
            _context = context;
        }

        public IList<CallRequest> CallRequest { get;set; } = default!;

        public async Task OnGetAsync()
        {
            if (_context.CallRequests != null)
            {
                CallRequest = await _context.CallRequests.ToListAsync();
            }
        }
    }
}
