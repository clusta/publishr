using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Cover
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }
       
        [JsonProperty("credits")]
        public IList<Credit> Credits { get; set; }
        
        [JsonProperty("images")]
        public IList<Source> Images { get; set; }
    }
}
