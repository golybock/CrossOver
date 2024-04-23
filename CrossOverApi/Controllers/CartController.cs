using System.Security.Claims;
using CrossOverApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrossOverApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
	protected Int32 UserId => Int32.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Authentication)?.Value);

	private readonly CrossOverContext _crossOverContext = new CrossOverContext();

	[HttpGet("[action]")]
	public IEnumerable<Cart> GetCart()
	{
		return _crossOverContext.Carts
			.Include(c => c.Product)
			.Where(c => c.ClientId == UserId)
			.ToList();
	}

	[HttpPost("[action]")]
	public IActionResult AddToCart(int productId, int count)
	{
		try
		{
			_crossOverContext.Carts.Add(new Cart() {ClientId = UserId, ProductId = productId, Count = count});
			_crossOverContext.SaveChanges();

		}
		catch (Exception e)
		{
			return BadRequest();
		}

		return Ok();
	}

	[HttpPost("[action]")]
	public IActionResult RemoveFromCart(int productId)
	{
		try
		{
			var c =_crossOverContext.Carts.Where(c => c.ClientId == UserId && c.ProductId == productId).ToList();
			_crossOverContext.Carts.RemoveRange(c);
			_crossOverContext.SaveChanges();
		}
		catch (Exception e)
		{
			return BadRequest();
		}

		return Ok();
	}
}