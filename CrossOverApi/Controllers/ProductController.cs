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
	public IEnumerable<Product> Search(string? search, int sortType)
	{
		var products = _crossOverContext.Products
			.Include(c => c.Category)
			.Where(c => c.Name.ToLower().Contains(search ?? ""))
			.ToList();

		if (sortType == 0)
		{
			products = products.OrderBy(c => c.Price).ToList();
		}

		if (sortType == 1)
		{
			products = products.OrderByDescending(c => c.Price).ToList();
		}

		return products;
	}

	[HttpGet("[action]")]
	public IEnumerable<Category> GetCategories()
	{
		return _crossOverContext.Categories.ToList();
	}
}