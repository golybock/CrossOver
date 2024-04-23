using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CrossOverBack.Models;

namespace CrossOverBack.Pages.Orders
{
	public class IndexModel : PageModel
	{
		private readonly CrossOverBack.Models.CrossOverContext _context;

		public IndexModel(CrossOverBack.Models.CrossOverContext context)
		{
			_context = context;
		}

		public IList<Order> Order { get; set; } = default!;

		public async Task OnGetAsync()
		{
			if (_context.Orders != null)
			{
				Order = await _context.Orders
					.Include(o => o.Client)
					.Include(o => o.Status)
					.Include(o => o.Worker).ToListAsync();
			}
		}
	}
}