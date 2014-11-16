using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Section
    {
        [JsonProperty("kind")]
        public string Kind { get; set; }

        [JsonProperty("region")]
        public string Region { get; set; }

        [JsonProperty("format")]
        public string Format { get; set; }

        [JsonProperty("blocks")]
        public IList<Block> Blocks { get; set; }

        [JsonProperty("actions")]
        public IList<Action> Actions { get; set; }

        [JsonProperty("media")]
        public IList<Media> Media { get; set; }

        [JsonProperty("priority")]
        public int Priority { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
