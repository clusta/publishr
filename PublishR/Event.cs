using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Event
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }        
        
        [JsonProperty("start")]
        public DateTime StartAt { get; set; }

        [JsonProperty("end")]
        public DateTime EndAt { get; set; }

        [JsonProperty("location")]
        public string Location { get; set; }

        [JsonProperty("address")]
        public Address Address { get; set; }
    }
}
