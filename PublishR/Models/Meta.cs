using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Meta
    {
        [JsonProperty("created")]
        public DateTime Created { get; set; }

        [JsonProperty("updated")]
        public DateTime Updated { get; set; }

        [JsonProperty("workspace")]
        public string Workspace { get; set; }

        [JsonProperty("kind")]
        public string Kind { get; set; }

        [JsonProperty("path")]
        public string Path { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("privacy")]
        public string Privacy { get; set; }

        [JsonProperty("owner")]
        public string Owner { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
