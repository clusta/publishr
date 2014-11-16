using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Lead
    {
        [JsonProperty("id")]
        public string LeadId { get; set; }

        [JsonProperty("created")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("contacts")]
        public IList<Contact> Contacts { get; set; }

        [JsonProperty("subscriptions")]
        public string[] Subscriptions { get; set; }

        [JsonProperty("optin")]
        public bool IsOptIn { get; set; }

        [JsonProperty("properties")]
        public IDictionary<string, object> Properties { get; set; }
    }
}
