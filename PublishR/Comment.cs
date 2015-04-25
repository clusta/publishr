using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Comment
    {
        [JsonProperty("author")]
        public Author Author { get; set; }        
        
        [JsonProperty("created")]
        public DateTime Created { get; set; }

        [JsonProperty("content")]
        public Block Text { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
