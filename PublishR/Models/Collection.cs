using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Collection
    {
        [JsonProperty("listings")]
        public IList<Listing> Listings { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }    
    }
}
