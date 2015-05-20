using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Instagram
{
    public class InstagramResponse<T>
    {
        [JsonProperty("meta")]
        public InstagramMeta Meta { get; set; }

        [JsonProperty("data")]
        public IEnumerable<T> Data { get; set; }
    }
}
