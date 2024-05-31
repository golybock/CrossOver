using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CrossOverBack.Pages.Account;

public class SignOut : PageModel
{
	public IActionResult OnGet()
	{
		HttpContext.SignOutAsync();

		return RedirectToPage("/Index");
	}
}