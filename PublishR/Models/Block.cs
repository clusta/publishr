﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Block
    {
        [JsonProperty("format")]
        public string Format { get; set; }

        [JsonProperty("body")]
        public string Body { get; set; }
    }
}
