using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using CrossOverBack.Models;

namespace CrossOverBack.Pages.Product
{
	public class CreateModel : PageModel
	{
		private readonly CrossOverBack.Models.CrossOverContext _context;

		public CreateModel(CrossOverBack.Models.CrossOverContext context)
		{
			_context = context;
		}

		public IActionResult OnGet()
		{
			ViewData["CategoryId"] = new SelectList(_context.Categories, "Id", "Name");
			return Page();
		}

		[BindProperty] public Models.Product Product { get; set; } = default!;


		// To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
		public async Task<IActionResult> OnPostAsync()
		{
			_context.Products.Add(Product);
			await _context.SaveChangesAsync();

			return RedirectToPage("./Index");
		}
	}
}