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
        [JsonProperty("kind")]
        public string Kind { get; set; }        
        
        [JsonProperty("created")]
        public DateTime Created { get; set; }

        [JsonProperty("updated")]
        public DateTime Updated { get; set; }

        [JsonProperty("cards")]
        public IDictionary<string, Card> Cards { get; set; }

        [JsonProperty("listings")]
        public IList<Listing> Listings { get; set; }

        [JsonProperty("facets")]
        public IList<Facet> Facets { get; set; }

        [JsonProperty("continuation")]
        public string Continuation { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }    
    }
}
