using System.Security.Claims;
using CrossOverBack.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace CrossOverBack.Pages.Account;

public class Login : PageModel
{
	private readonly CrossOverContext _context;

	public Login(CrossOverContext context)
	{
		_context = context;
	}

	[BindProperty]
	public string LoginData { get; set; } = default!;

	[BindProperty]
	public string Password { get; set; } = default!;

	[BindProperty]
	public string Error { get; set; }

	public async Task<IActionResult> OnPost()
	{
		var user = _context.Workers
			.Include(worker => worker.Role)
			.FirstOrDefault(c => c.Login == LoginData && c.Password == Password);

		if (user == null)
		{
			Error = "Неверный логин или пароль";

			return Page();
		}

		var claims = new List<Claim>
		{
			new Claim(ClaimTypes.Name, user.Name),
			new Claim(ClaimTypes.Role, user.Role.Name),
		};

		var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

		await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

		return Redirect("/");
	}
}