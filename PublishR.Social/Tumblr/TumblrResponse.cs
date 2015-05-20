using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Tumblr
{
    public class TumblrResponse
    {
        [JsonProperty("meta")]
        public TumblrMeta Meta { get; set; }

        [JsonProperty("response")]
        public TumblrResponseInner Response { get; set; }
    }
}
