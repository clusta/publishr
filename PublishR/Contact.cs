using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Contact
    {
        [JsonProperty("kind")]
        public string Kind { get; set; }

        [JsonProperty("person")]
        public Person Person { get; set; }

        [JsonProperty("company")]
        public string Company { get; set; }

        [JsonProperty("position")]
        public string Position { get; set; }

        [JsonProperty("phone")]
        public string PhoneNumber { get; set; }

        [JsonProperty("mobile")]
        public string MobileNumber { get; set; }

        [JsonProperty("email")]
        public string EmailAddress { get; set; }

        [JsonProperty("address")]
        public Address Address { get; set; }

        [JsonProperty("point")]
        public Point Point { get; set; }

        [JsonProperty("public")]
        public bool IsPublic { get; set; }
    }
}
