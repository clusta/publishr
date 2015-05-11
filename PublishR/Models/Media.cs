using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Media
    {
        [JsonProperty("caption")]
        public string Caption { get; set; }

        [JsonProperty("credit")]
        public string Credit { get; set; }

        [JsonProperty("sources")]
        public IList<Source> Sources { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
