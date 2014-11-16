using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Article
    {
        [JsonProperty("id")] 
        public string ArticleId { get; set; }

        [JsonProperty("kind")]
        public string Kind { get; set; }
        
        [JsonProperty("slug")]
        public string Slug { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }
        
        [JsonProperty("channel")]
        public string ChannelId { get; set; }  
      
        [JsonProperty("template")]
        public string TemplateId { get; set; }        
        
        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("deleted")]
        public bool IsDeleted { get; set; }

        [JsonProperty("public")]
        public bool IsPublic { get; set; }
        
        [JsonProperty("created")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("updated")]
        public DateTime UpdatedAt { get; set; }

        [JsonProperty("tags")]
        public string[] Tags { get; set; }

        [JsonProperty("schedule")]
        public Schedule Schedule { get; set; }

        [JsonProperty("navigation")]
        public Navigation Navigation { get; set; }

        [JsonProperty("metadata")]
        public Metadata Metadata { get; set; }

        [JsonProperty("metrics")]
        public Metrics Metrics { get; set; }

        [JsonProperty("profiles")]
        public IList<Profile> Profiles { get; set; }

        [JsonProperty("sections")]
        public IList<Section> Sections { get; set; }

        [JsonProperty("contacts")]
        public IList<Contact> Contacts { get; set; }

        [JsonProperty("events")]
        public IList<Event> Events { get; set; }

        [JsonProperty("prices")]
        public IList<Price> Prices { get; set; }

        [JsonProperty("links")]
        public IList<Link> Links { get; set; }
        
        [JsonProperty("cards")]
        public IDictionary<string, Card> Cards { get; set; }

        [JsonProperty("feeds")]
        public IDictionary<string, Feed> Feeds { get; set; }

        [JsonProperty("features")]
        public IDictionary<string, Feature> Features { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}