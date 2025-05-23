using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CrossOverBack.Models;

namespace CrossOverBack.Pages.Orders
{
    public class DetailsModel : PageModel
    {
        private readonly CrossOverBack.Models.CrossOverContext _context;

        public DetailsModel(CrossOverBack.Models.CrossOverContext context)
        {
            _context = context;
        }

      public Order Order { get; set; } = default!; 

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var order = await _context.Orders
                .Include(c => c.Client)
                .Include(c => c.Status)
                .Include(c => c.OrdersProducts)
                .ThenInclude(c => c.Product)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (order == null)
            {
                return NotFound();
            }
            else 
            {
                Order = order;
            }
            return Page();
        }
    }
}
