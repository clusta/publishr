using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Workspace
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("created")]
        public DateTime Created { get; set; }
        
        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
