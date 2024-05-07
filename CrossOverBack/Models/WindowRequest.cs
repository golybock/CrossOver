using System;
using System.Collections.Generic;

namespace CrossOverBack.Models;

public partial class WindowRequest
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public string City { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int WindowId { get; set; }

    public virtual Window Window { get; set; } = null!;
}
