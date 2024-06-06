using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CrossOverApi.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace CrossOverApi.Controllers;

// авторизация и регистрация юзеров
[ApiController]
[Route("api/[controller]")]
public class AuthController: ControllerBase
{
	private readonly CrossOverContext _crossOverContext = new CrossOverContext();

	[HttpPost("[action]")]
	public async Task<IActionResult> SignIn(string login, string password)
	{
		var user = _crossOverContext.Clients.FirstOrDefault(c => (c.Login == login || c.Email == login) && c.Password == password);

		if (user == null)
		{
			return BadRequest("Пользователь не найден");
		}

		var claims = new List<Claim>
		{
			new Claim(ClaimTypes.Authentication, user.Id.ToString(), CookieAuthenticationDefaults.AuthenticationScheme),
			new Claim(ClaimTypes.Name, user.Email, CookieAuthenticationDefaults.AuthenticationScheme),
			new Claim(ClaimTypes.Role, "Client"),
		};

		var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("f27b3a94644036f925392d8b4b923b5f"));
		var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
		var expirationTimeStamp = DateTime.Now.AddDays(30);

		var tokenOptions = new JwtSecurityToken(
			issuer: "auth",
			audience: "client",
			claims: claims,
			expires: expirationTimeStamp,
			signingCredentials: signingCredentials
		);

		var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

		return new OkObjectResult(tokenString);
	}

	[HttpPost("[action]")]
	public async Task<IActionResult> SignUp(Client client)
	{
		var user = _crossOverContext.Clients.FirstOrDefault(c => c.Login == client.Login || c.Email == client.Email || c.Phone == client.Phone);

		if (user != null)
		{
			return BadRequest("Пользователь уже зарегистрирован");
		}

		_crossOverContext.Clients.Add(client);
		await _crossOverContext.SaveChangesAsync();

		var claims = new List<Claim>
		{
			new Claim(ClaimTypes.Authentication, client.Id.ToString(), CookieAuthenticationDefaults.AuthenticationScheme),
			new Claim(ClaimTypes.Name, client.Email ?? "email", CookieAuthenticationDefaults.AuthenticationScheme),
			new Claim(ClaimTypes.Role, "Client"),
		};

		var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("f27b3a94644036f925392d8b4b923b5f"));
		var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
		var expirationTimeStamp = DateTime.Now.AddDays(30);

		var tokenOptions = new JwtSecurityToken(
			issuer: "auth",
			audience: "client",
			claims: claims,
			expires: expirationTimeStamp,
			signingCredentials: signingCredentials
		);

		var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

		return new OkObjectResult(tokenString);
	}

	protected Int32 UserId => Int32.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Authentication)?.Value);

	[HttpGet("[action]")]
	public async Task<Client> GetMe()
	{
		return _crossOverContext.Clients.FirstOrDefault(c => c.Id == UserId);
	}
}