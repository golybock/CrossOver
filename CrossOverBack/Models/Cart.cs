using System;
using System.Collections.Generic;

namespace CrossOverBack.Models;

public partial class Cart
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public int Count { get; set; }

    public int? ClientId { get; set; }

    public virtual Client? Client { get; set; }

    public virtual Product Product { get; set; } = null!;
}
