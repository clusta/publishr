using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Data
    {
        [JsonProperty("items")]
        public IList Items { get; set; }

        [JsonProperty("continuation")]
        public Continuation Continuation { get; set; }

        [JsonProperty("count")]
        public int? ItemsCount { get; set; }
    }
}
