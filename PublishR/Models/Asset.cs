using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Models
{
    public class Asset
    {
        [JsonProperty("dimensions")]
        public Dimensions Dimensions { get; set; }

        [JsonProperty("required")]
        public bool Required { get; set; }

        [JsonProperty("mimetypes")]
        public string[] MimeTypes { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
