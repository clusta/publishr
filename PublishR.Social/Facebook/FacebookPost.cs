using Newtonsoft.Json;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Facebook
{
    public class FacebookPost
    {
        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("object_id")]
        public string ObjectId { get; set; }

        [JsonProperty("created_time")]
        public DateTime CreatedTime { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("link")]
        public string Link { get; set; }

        public Listing ToLising()
        {
            return new Listing()
            {
                Kind = Known.Provider.Facebook,
                Category = Type,
                Uri = Link,
                Created = CreatedTime,
                Cards = new Dictionary<string, Card>() 
                {
                    {
                        Known.Card.Medium,
                        new Card() 
                        {
                            Description = Message,
                            Media = new List<Media>() 
                            {
                                new Media() 
                                {
                                    Sources = new List<Source>()
                                    {
                                        new Source() 
                                        {
                                            Uri = string.Format("https://graph.facebook.com/{0}/picture", ObjectId)
                                        }
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
