using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CrossOverApi.Models;

public partial class Window
{
    public int Id { get; set; }

    public int Height { get; set; }

    public int Width { get; set; }

    public int Color { get; set; }

    public int Packet { get; set; }

    public int WindowType { get; set; }

    public bool HasWindowsill { get; set; }

    public bool HasLattice { get; set; }
    [JsonIgnore]
    public virtual Color? ColorNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual Packet? PacketNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<WindowRequest> WindowRequests { get; set; } = new List<WindowRequest>();
    public virtual ICollection<WindowSection> WindowSections { get; set; } = new List<WindowSection>();
    [JsonIgnore]
    public virtual WindowType? WindowTypeNavigation { get; set; } = null!;
}
