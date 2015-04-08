﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Card
    {        
        [JsonProperty("uri")]
        public string Uri { get; set; }

        [JsonProperty("kind")]
        public string Kind { get; set; }      

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("created")]
        public DateTime Created { get; set; }

        [JsonProperty("media")]
        public IList<Media> Media { get; set; }

        [JsonProperty("author")]
        public Author Author { get; set; }

        [JsonProperty("tags")]
        public string[] Tags { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
