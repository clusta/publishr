using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Result
    {
        [JsonProperty("items")]
        public IList Items { get; set; }

        [JsonProperty("facets")]
        public IList<Facet> Facets { get; set; }

        [JsonProperty("continuation")]
        public string Continuation { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }    
    }
}
