using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Document<T> : Resource<T>
    {
        [JsonProperty("tokens")]
        public IDictionary<string, Token> Tokens { get; set; }

        [JsonProperty("claims")]
        public IDictionary<string, string[]> Claims { get; set; }

        [JsonProperty("associations")]
        public IDictionary<string, string[]> Associations { get; set; }

        public Resource<T> AsResource()
        {
            return new Resource<T>()
            {
                Id = Id,
                Meta = Meta,
                Data = Data
            };
        }
    }
}
