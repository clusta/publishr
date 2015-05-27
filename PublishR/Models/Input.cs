using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Input
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("label")]
        public string Label { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("hint")]
        public string Hint { get; set; }

        [JsonProperty("pattern")]
        public string Pattern { get; set; }

        [JsonProperty("required")]
        public bool Required { get; set; }

        [JsonProperty("range")]
        public Range Range { get; set; }

        [JsonProperty("length")]
        public Length Length { get; set; }

        [JsonProperty("value")]
        public object Value { get; set; }

        [JsonProperty("options")]
        public IList<Option> Options { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
