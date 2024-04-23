using System;
using System.Collections.Generic;

namespace CrossOverBack.Models;

public partial class WindowType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Window> Windows { get; } = new List<Window>();
}
