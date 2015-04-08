using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Comment
    {
        [JsonProperty("author")]
        public Author Author { get; set; }        
        
        [JsonProperty("created")]
        public DateTime Created { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }
    }
}
