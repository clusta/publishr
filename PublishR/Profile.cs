using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Profile
    {
        [JsonProperty("name")]
        public string Name { get; set; }        
        
        [JsonProperty("alias")]
        public string Alias { get; set; }

        [JsonProperty("uri")]
        public string Uri { get; set; }

        [JsonProperty("images")]
        public IList<Source> Images { get; set; }
    }
}
