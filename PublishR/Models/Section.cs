using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Section
    {
        [JsonProperty("template")]
        public string Template { get; set; }

        [JsonProperty("blocks")]
        public IDictionary<string, Block> Blocks { get; set; }

        [JsonProperty("collections")]
        public IDictionary<string, Collection> Collections { get; set; } 

        [JsonProperty("schedules")]
        public IList<Schedule> Schedules { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
