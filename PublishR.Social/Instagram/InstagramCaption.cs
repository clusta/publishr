using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Instagram
{
    public class InstagramCaption
    {
        [JsonProperty("text")]
        public string Text { get; set; }
    }
}
