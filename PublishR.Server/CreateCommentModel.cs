using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Server
{
    public class CreateCommentModel
    {
        [JsonProperty("uri")]
        [RequiredAttribute]
        public string Uri { get; set; }        
        
        [JsonProperty("content")]
        public Block Content { get; set; }
    }
}
