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
        [JsonProperty("layout")]
        public string Layout { get; set; }

        [JsonProperty("region")]
        public string Region { get; set; }

        [JsonProperty("blocks")]
        public IDictionary<string, Block> Blocks { get; set; }

        [JsonProperty("links")]
        public IList<Link> Links { get; set; }

        [JsonProperty("fields")]
        public IList<Field> Fields { get; set; }

        [JsonProperty("media")]
        public IList<Media> Media { get; set; }

        [JsonProperty("schedule")]
        public Schedule Schedule { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
