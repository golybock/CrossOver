using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CrossOverApi.Models;

public partial class WindowRequestWindow
{
    public int Id { get; set; }

    public int WindowRequestId { get; set; }

    public int WindowId { get; set; }

    public virtual Window Window { get; set; } = null!;
    [JsonIgnore]
    public virtual WindowRequest WindowRequest { get; set; } = null!;
}
