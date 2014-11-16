using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Credential
    {
        [JsonProperty("provider")]
        public string Provider { get; set; }

        [JsonProperty("container")]
        public string Container { get; set; }

        [JsonProperty("account")]
        public Token AccountToken { get; set; }

        [JsonProperty("access")]
        public Token AccessToken { get; set; }
    }
}
