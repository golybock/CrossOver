using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CrossOverBack.Models;

namespace CrossOverBack.Pages.Product
{
	public class DetailsModel : PageModel
	{
		private readonly CrossOverBack.Models.CrossOverContext _context;

		public DetailsModel(CrossOverBack.Models.CrossOverContext context)
		{
			_context = context;
		}

		public Models.Product Product { get; set; } = default!;

		public async Task<IActionResult> OnGetAsync(int? id)
		{
			if (id == null || _context.Products == null)
			{
				return NotFound();
			}

			var product = await _context.Products.FirstOrDefaultAsync(m => m.Id == id);
			if (product == null)
			{
				return NotFound();
			}
			else
			{
				Product = product;
			}

			return Page();
		}
	}
}