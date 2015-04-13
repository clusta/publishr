using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.DocumentDB
{
    public class DocumentResource<T>
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("workspace")]
        public string Workspace { get; set; }

        [JsonProperty("owner")]
        public string Owner { get; set; }

        [JsonProperty("data")]
        public T Data { get; set; }

        [JsonProperty("tokens")]
        public IDictionary<string, Token> Tokens { get; set; }

        [JsonProperty("grants")]
        public IDictionary<string, string[]> Grants { get; set; }

        [JsonProperty("associations")]
        public IDictionary<string, string[]> Associations { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
