using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Instagram
{
    public class InstagramMeta
    {
        [JsonProperty("code")]
        public int Code { get; set; }
    }
}
