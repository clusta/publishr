using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Media
    {
        [JsonProperty("kind")]
        public string Kind { get; set; }

        [JsonProperty("caption")]
        public string Caption { get; set; }

        [JsonProperty("credit")]
        public string Credit { get; set; }

        [JsonProperty("license")]
        public string License { get; set; }

        [JsonProperty("sources")]
        public IList<Source> Sources { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
