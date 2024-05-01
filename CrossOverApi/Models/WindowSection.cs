﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CrossOverApi.Models;

public partial class WindowSection
{
    [JsonIgnore]
    public int Id { get; set; }
    [JsonIgnore]
    public int WindowId { get; set; }

    public int SectionType { get; set; }
    [JsonIgnore]
    public virtual SectionType SectionTypeNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual Window Window { get; set; } = null!;
}
