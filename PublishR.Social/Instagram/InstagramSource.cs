using Newtonsoft.Json;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Instagram
{
    public class InstagramSource
    {
        [JsonProperty("url")]
        public string Url { get; set; }
        
        [JsonProperty("height")]
        public int Height { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        public Source ToSource()
        {
            return new Source()
            {
                Uri = Url,
                Type = Known.ContentType.Jpg,
                Dimensions = new Dimensions()
                {
                    Width = Width,
                    Height = Height
                }
            };
        }
    }
}
