using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Page
    {
        [JsonProperty("kind")]
        public string Kind { get; set; }

        [JsonProperty("created")]
        public DateTime Created { get; set; }

        [JsonProperty("updated")]
        public DateTime Updated { get; set; }

        [JsonProperty("tags")]
        public string[] Tags { get; set; }

        [JsonProperty("metadata")]
        public Metadata Metadata { get; set; }
      
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