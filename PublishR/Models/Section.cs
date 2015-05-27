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
        [JsonProperty("layout")]
        public string Layout { get; set; }

        [JsonProperty("region")]
        public string Region { get; set; }

        [JsonProperty("containers")]
        public IDictionary<string, Container> Containers { get; set; }

        [JsonProperty("schedules")]
        public IList<Schedule> Schedules { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
