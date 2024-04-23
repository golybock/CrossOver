using System.Security.Claims;
using CrossOverApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrossOverApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
	protected Int32 UserId => Int32.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Authentication)?.Value);

	private readonly CrossOverContext _crossOverContext = new CrossOverContext();

	[HttpGet("[action]")]
	public IEnumerable<Order> GetOrders()
	{
		return _crossOverContext.Orders
			.Include(c => c.OrdersProducts)
			.ThenInclude(c => c.Product)
			.Include(c => c.Status)
			.Where(c => c.ClientId == UserId)
			.ToList();
	}
}