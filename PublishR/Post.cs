using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Post
    {
        [JsonProperty("id")]
        public string PostId { get; set; }

        [JsonProperty("channel")]
        public string ChannelId { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("deleted")]
        public bool IsDeleted { get; set; }

        [JsonProperty("public")]
        public bool IsPublic { get; set; }      
  
        [JsonProperty("created")]
        public DateTime CreatedAt { get; set; }
        
        [JsonProperty("uri")]
        public string Uri { get; set; }

        [JsonProperty("provider")]
        public string Provider { get; set; }

        [JsonProperty("cards")]
        public IDictionary<string, Card> Cards { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
