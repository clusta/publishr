using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Query
    {
        [JsonProperty("kind")]
        public string Kind { get; set; }

        [JsonProperty("skip")]
        public int Skip { get; set; }

        [JsonProperty("take")]
        public int Take { get; set; }

        [JsonProperty("sort")]
        public string Sort { get; set; }

        [JsonProperty("filter")]
        public string Filter { get; set; }

        [JsonProperty("parameters")]
        public IDictionary<string, object> Parameters { get; set; }
    }
}
