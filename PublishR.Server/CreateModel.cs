using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Server
{
    public class CreateModel<T>
    {
        [JsonProperty("kind")]
        [RequiredAttribute]
        public string Kind { get; set; }        
        
        [JsonProperty("path")]
        [RequiredAttribute]
        public string Path { get; set; }

        [JsonProperty("data")]
        public T Data { get; set; }
    }
}
