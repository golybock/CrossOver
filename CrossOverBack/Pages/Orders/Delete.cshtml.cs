using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CrossOverBack.Models;

namespace CrossOverBack.Pages.Orders
{
	public class DeleteModel : PageModel
	{
		private readonly CrossOverBack.Models.CrossOverContext _context;

		public DeleteModel(CrossOverBack.Models.CrossOverContext context)
		{
			_context = context;
		}

		[BindProperty] public Order Order { get; set; } = default!;

		public async Task<IActionResult> OnGetAsync(int? id)
		{
			if (id == null)
			{
				return NotFound();
			}

			var order = await _context.Orders.FirstOrDefaultAsync(m => m.Id == id);

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

		public async Task<IActionResult> OnPostAsync(int? id)
		{
			if (id == null)
			{
				return NotFound();
			}

			var order = await _context.Orders.FindAsync(id);

			if (order != null)
			{
				Order = order;
				_context.Orders.Remove(Order);
				await _context.SaveChangesAsync();
			}

			return RedirectToPage("./Index");
		}
	}
}