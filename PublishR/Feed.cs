using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Feed
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("query")]
        public Query Query { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }

        [JsonProperty("data")]
        public Data Data { get; set; }
    }
}
