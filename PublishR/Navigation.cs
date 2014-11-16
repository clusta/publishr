using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Navigation
    {
        [JsonProperty("index")]
        public int Index { get; set; }

        [JsonProperty("parent")]
        public string ParentId { get; set; }

        [JsonProperty("label")]
        public string Label { get; set; }
    }
}
