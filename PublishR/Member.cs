using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Member
    {
        [JsonProperty("email")]
        public string EmailAddress { get; set; }

        [JsonProperty("permission")]
        public string Permission { get; set; }

        [JsonProperty("suspended")]
        public bool IsSuspended { get; set; }
    }
}
