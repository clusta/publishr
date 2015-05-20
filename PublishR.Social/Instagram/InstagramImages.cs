using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Instagram
{
    public class InstagramImages
    {
        [JsonProperty("low_resolution")]
        public InstagramSource LowResolution { get; set; }

        [JsonProperty("thumbnail")]
        public InstagramSource Thumbnail { get; set; }

        [JsonProperty("standard_resolution")]
        public InstagramSource StandardResolution { get; set; }
    }
}
