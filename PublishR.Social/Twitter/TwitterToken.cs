using Newtonsoft.Json;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Twitter
{
    public class TwitterToken
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
    }
}
