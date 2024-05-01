using System;
using System.Collections.Generic;

namespace CrossOverApi.Models;

public partial class WindowRequest
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public string City { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Description { get; set; } = null!;

    public virtual ICollection<WindowRequestWindow> WindowRequestWindows { get; set; } = new List<WindowRequestWindow>();
}
