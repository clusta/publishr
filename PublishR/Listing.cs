using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Listing
    {
        [JsonProperty("id")]
        public string Id { get; set; }                   
        
        [JsonProperty("uri")]
        public string Uri { get; set; }        
        
        [JsonProperty("kind")]
        public string Kind { get; set; }

        [JsonProperty("category")]
        public string Category { get; set; }

        [JsonProperty("author")]
        public Author Author { get; set; }

        [JsonProperty("created")]
        public DateTime Created { get; set; }

        [JsonProperty("updated")]
        public DateTime Updated { get; set; }    

        [JsonProperty("cards")]
        public IDictionary<string, Card> Cards { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
