using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Price
    {
        [JsonProperty("retail")]
        public double RetailPrice { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }

        [JsonProperty("quantity")]
        public int Quantity { get; set; }

        [JsonProperty("start")]
        public DateTime StartAt { get; set; }

        [JsonProperty("end")]
        public DateTime EndAt { get; set; }
    }
}
