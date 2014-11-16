using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Metrics
    {
        [JsonProperty("view")]
        public int ViewCount { get; set; }

        [JsonProperty("share")]
        public int ShareCount { get; set; }

        [JsonProperty("comment")]
        public int CommentCount { get; set; }
    }
}
