using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CrossOverApi.Models;

public partial class Status
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
