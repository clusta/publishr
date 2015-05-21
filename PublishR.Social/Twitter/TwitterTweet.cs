using Newtonsoft.Json;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Twitter
{
    public class TwitterTweet
    {
        [JsonProperty("text")]
        public string Text { get; set; }

        public Listing ToListing()
        {
            return new Listing()
            {
                Cards = new Dictionary<string, Card>()
                {
                    {
                        Known.Card.Medium,
                        new Card() 
                        {
                            Description = Text
                        }
                    }
                }
            };
        }
    }
}
