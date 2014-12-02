using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Template
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("channel")]
        public string Channel { get; set; }
       
        [JsonProperty("name")]
        public string Name { get; set; } 
        
        [JsonProperty("metadata")]
        public Metadata Metadata { get; set; }

        [JsonProperty("theme")]
        public Theme Theme { get; set; }

        [JsonProperty("sections")]
        public IList<Section> Sections { get; set; }     
  
        [JsonProperty("links")]
        public IList<Link> Links { get; set; }

        [JsonProperty("cards")]
        public IDictionary<string, Card> Cards { get; set; }

        [JsonProperty("feeds")]
        public IDictionary<string, Feed> Feeds { get; set; }

        [JsonProperty("features")]
        public IDictionary<string, Feature> Features { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
