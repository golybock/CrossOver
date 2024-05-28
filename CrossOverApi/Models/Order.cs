using System;
using System.Collections.Generic;

namespace CrossOverApi.Models;

public partial class Order
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public int ClientId { get; set; }

    public int StatusId { get; set; }

    public virtual Client Client { get; set; } = null!;

    public virtual ICollection<OrdersProduct> OrdersProducts { get; set; } = new List<OrdersProduct>();

    public virtual Status Status { get; set; } = null!;
}
