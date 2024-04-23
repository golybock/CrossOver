using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CrossOverBack.Pages.Account;

public class SignOut : PageModel
{
	public void OnGet()
	{
		HttpContext.SignOutAsync();
	}
}