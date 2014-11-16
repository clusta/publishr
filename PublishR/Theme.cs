using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Theme
    {
        [JsonProperty("logos")]
        public IList<Source> Logos { get; set; }

        [JsonProperty("icons")]
        public IList<Source> Icons { get; set; }

        [JsonProperty("covers")]
        public IList<Source> Covers { get; set; }

        [JsonProperty("backgrounds")]
        public IList<Source> Backgrounds { get; set; }

        [JsonProperty("color")]
        public string Color { get; set; }

        [JsonProperty("embeds")]
        public IDictionary<string, object> Embeds { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
