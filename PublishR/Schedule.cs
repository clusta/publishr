using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Schedule
    {
        [JsonProperty("start")]
        public DateTime StartAt { get; set; }

        [JsonProperty("end")]
        public DateTime EndAt { get; set; }
    }
}
