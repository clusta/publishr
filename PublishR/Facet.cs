using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Facet
    {
        [JsonProperty("uri")]
        public string Uri { get; set; }            
        
        [JsonProperty("name")]
        public string Name { get; set; }        
        
        [JsonProperty("count")]
        public int Count { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
