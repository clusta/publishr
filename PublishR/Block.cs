using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Block
    {
        [JsonProperty("format")]
        public string Format { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }
    }
}
