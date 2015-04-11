using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Token
    {
        [JsonProperty("value")]
        public string Value { get; set; }

        [JsonProperty("expiry")]
        public DateTime Expiry { get; set; }
    }
}
