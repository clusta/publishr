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
        [JsonProperty("format")]
        public string Format { get; set; }

        [JsonProperty("region")]
        public string Region { get; set; }

        [JsonProperty("heading")]
        public string Heading { get; set; }

        [JsonProperty("content")]
        public string Content { get; set; }

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
