using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Entry
    {
        [JsonProperty("author")]
        public Author Author { get; set; }        
        
        [JsonProperty("created")]
        public DateTime Created { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
