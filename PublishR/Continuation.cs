using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Continuation
    {
        [JsonProperty("next")]
        public string NextUri { get; set; }

        [JsonProperty("previous")]
        public string PreviousUri { get; set; }
    }
}
