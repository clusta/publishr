using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Environment
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("alias")]
        public string Alias { get; set; }

        [JsonProperty("hostname")]
        public string Hostname { get; set; }

        [JsonProperty("template")]
        public string Template { get; set; }

        [JsonProperty("credentials")]
        public IList<Credential> Credentials { get; set; }

        [JsonProperty("public")]
        public bool IsPublic { get; set; }

        [JsonProperty("secure")]
        public bool IsSecure { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
