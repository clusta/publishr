using Newtonsoft.Json;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.DocumentDB
{
    public class DocumentResource<T> : Resource<T>
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
                Metadata = Metadata,
                Content = Content
            };
        }
    }
}
