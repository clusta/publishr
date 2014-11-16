using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Organization
    {
        [JsonProperty("id")]
        public string OrganizationId { get; set; }

        [JsonProperty("channel")]
        public string ChannelId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("profiles")]
        public IList<Profile> Profiles { get; set; }

        [JsonProperty("contacts")]
        public IList<Contact> Contacts { get; set; }

        [JsonProperty("navigation")]
        public Navigation Navigation { get; set; }
    }
}
