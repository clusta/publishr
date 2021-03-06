﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Schedule
    {
        [JsonProperty("start")]
        public DateTime Start { get; set; }

        [JsonProperty("end")]
        public DateTime End { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
