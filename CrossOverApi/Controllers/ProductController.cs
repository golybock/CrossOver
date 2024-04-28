using CrossOverApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrossOverApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
	private CrossOverContext _crossOverContext = new CrossOverContext();

	[HttpGet("[action]")]
	public IEnumerable<Product> GetProducts()
	{
		return _crossOverContext.Products.Include(c => c.Category).ToList();
	}

	[HttpGet("[action]")]
	public IEnumerable<Category> GetCategories()
	{
		return _crossOverContext.Categories.ToList();
	}
}