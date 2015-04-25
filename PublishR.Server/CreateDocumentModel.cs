using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Server
{
    public class CreateDocumentModel
    {
        [JsonProperty("kind")]
        [RequiredAttribute]
        public string Kind { get; set; }        
        
        [JsonProperty("slug")]
        [RequiredAttribute]
        public string Slug { get; set; }

        [JsonProperty("card")]
        public Card Card { get; set; }
    }
}
