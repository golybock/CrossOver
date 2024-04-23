using System;
using System.Collections.Generic;

namespace CrossOverApi.Models;

public partial class WindowSection
{
    public int Id { get; set; }

    public int WindowId { get; set; }

    public int SectionType { get; set; }

    public virtual SectionType SectionTypeNavigation { get; set; } = null!;

    public virtual Window Window { get; set; } = null!;
}
