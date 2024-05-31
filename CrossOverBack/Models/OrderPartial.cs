namespace CrossOverBack.Models;

public partial class Order
{
	public string Info => ToString();

	public override string ToString()
	{
		var res = "";

		foreach (var ordersProduct in OrdersProducts)
		{
			res += $"{ordersProduct.Product.Name} {ordersProduct.Count} шт\n";
		}

		return res;
	}
}