﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Creative
    {        
        [JsonProperty("title")]
        public string Title { get; set; }        
        
        [JsonProperty("blocks")]
        public IDictionary<string, Block> Blocks { get; set; } 
        
        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
