using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Tumblr
{
    public class TumblrResponseInner
    {
        [JsonProperty("posts")]
        public IEnumerable<TumblrPost> Posts { get; set; }
    }
}
