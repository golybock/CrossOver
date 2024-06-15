using System.Security.Claims;
using System.Text.RegularExpressions;
using CrossOverApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Xceed.Words.NET;

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

	[HttpPost("[action]")]
	public IActionResult CreateOrder()
	{
		var cart = _crossOverContext.Carts.Where(c => c.ClientId == UserId).ToList();

		if (!cart.Any())
		{
			return BadRequest("Нет товаров в коризне");
		}

		var order = new Order()
		{
			ClientId = UserId,
			StatusId = 1,
			Date = DateTime.UtcNow,
			OrdersProducts = cart.Select(c => new OrdersProduct()
			{
				ProductId = c.ProductId, Count = c.Count
			}).ToList()
		};

		_crossOverContext.Orders.Add(order);
		_crossOverContext.SaveChanges();

		_crossOverContext.Carts.RemoveRange(cart);
		_crossOverContext.SaveChanges();

		return Ok("Заказ оформлен");
	}

	[HttpGet("[action]")]
	public IActionResult GetOrder(int id)
	{
		var path = $"{Guid.NewGuid()}.docx";

		try
		{
			var order = _crossOverContext.Orders
				.Include(order => order.Client)
				.First(c => c.Id == id);

			var orderProducts = _crossOverContext.OrdersProducts
				.Where(c => c.OrderId == order.Id)
				.Include(ordersProduct => ordersProduct.Product)
				.ToList();

			System.IO.File.Copy("Request.docx", path);

			var patterns = new Dictionary<string, string>()
			{
				{"date", order.Date.ToString("d")},
				{"client", order.Client.FullName},
				{"buyer", order.Client.FullName},
				{"doc_number", order.Id.ToString()},
			};

			Byte[] bytes;

			// Load a document.
			using (DocX document = DocX.Load(path))
			{
				foreach (var pattern in patterns)
				{
					document.ReplaceText("{" + pattern.Key + "}", pattern.Value);
				}

				{
					var table = document.AddTable(orderProducts.Count + 2, 7);

					table.Rows[0]
						.Cells[0]
						.Paragraphs
						.First()
						.Append("Код")
						.Font("Times New Roman")
						.FontSize(12)
						.Bold();

					table.MergeCellsInColumn(0, 0, 1);

					table.Rows[0]
						.Cells[1]
						.Paragraphs
						.First()
						.Append("Описание")
						.Font("Times New Roman")
						.FontSize(12)
						.Bold();

					table.MergeCellsInColumn(1, 0, 1);

					table.MergeCellsInColumn(2, 0, 1);

					table.Rows[0]
						.Cells[2]
						.Paragraphs
						.First()
						.Append("Кол-во")
						.Font("Times New Roman")
						.FontSize(12)
						.Bold();

					table.MergeCellsInColumn(3, 0, 1);

					table.Rows[0]
						.Cells[3]
						.Paragraphs
						.First()
						.Append("Цена")
						.Font("Times New Roman")
						.FontSize(12)
						.Bold();

					table.MergeCellsInColumn(4, 0, 1);

					table.Rows[0]
						.Cells[4]
						.Paragraphs
						.First()
						.Append("Скидка")
						.Font("Times New Roman")
						.FontSize(12)
						.Bold();

					table.MergeCellsInColumn(5, 0, 1);

					table.Rows[0]
						.Cells[5]
						.Paragraphs
						.First()
						.Append("Цена со скидкой")
						.Font("Times New Roman")
						.FontSize(12)
						.Bold();

					table.MergeCellsInColumn(6, 0, 1);

					table.Rows[0]
						.Cells[6]
						.Paragraphs
						.First()
						.Append("Сумма")
						.Font("Times New Roman")
						.FontSize(12)
						.Bold();

					table.MergeCellsInColumn(6, 0, 1);

					int count = 2;

					foreach (var docProduct in orderProducts)
					{
						table.Rows[count]
							.Cells[0]
							.Paragraphs
							.First()
							.Append(docProduct.Product.Id.ToString())
							.Font("Times New Roman")
							.FontSize(12);

						table.Rows[count]
							.Cells[1]
							.Paragraphs
							.First()
							.Append(docProduct.Product.Description)
							.Font("Times New Roman")
							.FontSize(12);

						table.Rows[count]
							.Cells[2]
							.Paragraphs
							.First()
							.Append(docProduct.Count.ToString())
							.Font("Times New Roman")
							.FontSize(12);

						table.Rows[count]
							.Cells[3]
							.Paragraphs
							.First()
							.Append(docProduct.Product.Price.ToString())
							.Font("Times New Roman")
							.FontSize(12);

						table.Rows[count]
							.Cells[4]
							.Paragraphs
							.First()
							.Append("0")
							.Font("Times New Roman")
							.FontSize(12);

						table.Rows[count]
							.Cells[5]
							.Paragraphs
							.First()
							.Append(docProduct.Product.Price.ToString())
							.Font("Times New Roman")
							.FontSize(12);

						table.Rows[count]
							.Cells[6]
							.Paragraphs
							.First()
							.Append((docProduct.Product.Price * docProduct.Count).ToString())
							.Font("Times New Roman")
							.FontSize(12);

						count++;
					}

					document.ReplaceTextWithObject("{table}", table, false, RegexOptions.IgnoreCase);
				}

				document.Save();
			}

			bytes = System.IO.File.ReadAllBytes(path);

			return File(bytes, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "Order.docx");
		}
		catch (Exception exception)
		{
			Console.WriteLine(exception);
			return BadRequest("Error");
		}
	}
}