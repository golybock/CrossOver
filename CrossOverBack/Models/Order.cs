using System;
using System.Collections.Generic;

namespace CrossOverBack.Models;

public partial class Order
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public int ClientId { get; set; }

    public int WorkerId { get; set; }

    public int StatusId { get; set; }

    public virtual Client Client { get; set; } = null!;

    public virtual ICollection<OrdersProduct> OrdersProducts { get; } = new List<OrdersProduct>();

    public virtual Status Status { get; set; } = null!;

    public virtual Worker Worker { get; set; } = null!;
}
