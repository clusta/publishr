using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Template
    {
        [JsonProperty("uri")]
        public string Uri { get; set; }

        [JsonProperty("body")]
        public string Body { get; set; }
        
        [JsonProperty("sections")]
        public IList<Section> Sections { get; set; }
      
        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}