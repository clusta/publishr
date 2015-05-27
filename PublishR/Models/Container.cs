using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Container
    {
        [JsonProperty("blocks")]
        public IList<Block> Blocks { get; set; }        
        
        [JsonProperty("links")]
        public IList<Link> Links { get; set; }

        [JsonProperty("inputs")]
        public IList<Input> Inputs { get; set; }

        [JsonProperty("media")]
        public IList<Media> Media { get; set; }
    }
}
