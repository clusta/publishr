using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Collection
    {
        [JsonProperty("created")]
        public DateTime Created { get; set; }

        [JsonProperty("updated")]
        public DateTime Updated { get; set; }

        [JsonProperty("cover")]
        public Cover Cover { get; set; }

        [JsonProperty("items")]
        public Card[] Items { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }    
    }
}
