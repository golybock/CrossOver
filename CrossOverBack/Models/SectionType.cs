using System;
using System.Collections.Generic;

namespace CrossOverBack.Models;

public partial class SectionType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<WindowSection> WindowSections { get; set; } = new List<WindowSection>();
}
