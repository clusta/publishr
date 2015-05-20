using Newtonsoft.Json;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Tumblr
{
    // https://www.tumblr.com/docs/en/api/v2#posts
    public class TumblrPost
    {
        [JsonProperty("type")]
        public string Type { get; set; }        
        
        [JsonProperty("post_url")]
        public string PostUrl { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("body")]
        public string Body { get; set; }

        [JsonProperty("date")]
        public DateTime Date { get; set; }

        public Listing ToListing()
        {
            return new Listing()
            {
                Kind = Known.Provider.Tumblr,
                Category = Type,
                Uri = PostUrl,
                Created = Date,                
                Cards = new Dictionary<string, Card>()
                {
                    {
                        Known.Card.Medium,
                        new Card() 
                        {
                            Title = Title,
                            Description = Body
                        }
                    }
                }
            };
        }
    }
}
