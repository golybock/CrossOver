using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CrossOverApi.Models;

public partial class WindowSection
{
    public int Id { get; set; }

    public int WindowId { get; set; }

    public int SectionType { get; set; }

    [JsonIgnore]
    public virtual SectionType? SectionTypeNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual Window? Window { get; set; } = null!;
}
