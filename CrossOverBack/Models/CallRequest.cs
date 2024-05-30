﻿using System;
using System.Collections.Generic;

namespace CrossOverBack.Models;

public partial class CallRequest
{
    public int Id { get; set; }

    public string Phone { get; set; } = null!;

    public string Name { get; set; } = null!;
}
