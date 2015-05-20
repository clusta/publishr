using Newtonsoft.Json;
using PublishR.Converters;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Instagram
{
    public class InstagramMedia
    {
        [JsonProperty("caption")]
        public InstagramCaption Caption { get; set; }
        
        [JsonProperty("link")]
        public string Link { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }
        
        [JsonProperty("created_time")]
        [JsonConverter(typeof(UnixDateTimeConverter))]
        public DateTime CreatedTime { get; set; }
        
        [JsonProperty("images")]
        public InstagramImages Images { get; set; }

        public Listing ToListing()
        {
            return new Listing()
            {
                Uri = Link,
                Kind = Known.Provider.Instagram,
                Category = Type,
                Created = CreatedTime,
                Cards = new Dictionary<string, Card>() 
                {
                    {
                        Known.Card.Medium,
                        new Card() 
                        {
                            Description = Caption.Text,
                            Media = new List<Media>() 
                            {
                                new Media() 
                                {
                                    Sources = new List<Source>() 
                                    {
                                        Images.LowResolution.ToSource(),
                                        Images.Thumbnail.ToSource(),
                                        Images.StandardResolution.ToSource()
                                    }
                                }
                            }
                        }
                    }
                }
            };
        }
    }
}
