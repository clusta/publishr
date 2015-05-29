using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Result
    {
        [JsonProperty("data")]
        public IList Data { get; set; }

        [JsonProperty("facets")]
        public IList<Facet> Facets { get; set; }

        [JsonProperty("continuation")]
        public Continuation Continuation { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }

        public static Result Empty()
        {
            return new Result()
            {
                Data = new List<Listing>(),
                Facets = new List<Facet>(),
                Properties = new Dictionary<string, object>()
            };
        }
    }
}
