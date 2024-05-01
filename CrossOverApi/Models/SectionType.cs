using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CrossOverApi.Models;

public partial class SectionType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<WindowSection> WindowSections { get; set; } = new List<WindowSection>();
}
