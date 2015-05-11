using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Page
    {
        [JsonProperty("tags")]
        public string[] Tags { get; set; }
     
        [JsonProperty("cards")]
        public IDictionary<string, Card> Cards { get; set; }

        [JsonProperty("sections")]
        public IList<Section> Sections { get; set; }

        [JsonProperty("credits")]
        public IList<Credit> Credits { get; set; }

        [JsonProperty("schedules")]
        public IList<Schedule> Schedules { get; set; }
        
        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}