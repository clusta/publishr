using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Action
    {
        [JsonProperty("uri")]
        public string Uri { get; set; }

        [JsonProperty("label")]
        public string Label { get; set; }

        [JsonProperty("icons")]
        public IList<Source> Icons { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
