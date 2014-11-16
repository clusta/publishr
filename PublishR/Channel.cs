using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PublishR
{
    public class Channel
    {
        [JsonProperty("id")]
        public string ChannelId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("template")]
        public string TemplateId { get; set; }

        [JsonProperty("navigation")]
        public Navigation Navigation { get; set; }

        [JsonProperty("members")]
        public IList<Member> Members { get; set; }

        [JsonProperty("environments")]
        public IDictionary<string, Environment> Environments { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}