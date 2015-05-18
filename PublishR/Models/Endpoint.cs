using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Endpoint
    {        
        [JsonProperty("uri")]
        public string Uri { get; set; }

        [JsonProperty("headers")]
        public IDictionary<string, object> Headers { get; set; }
    }
}
