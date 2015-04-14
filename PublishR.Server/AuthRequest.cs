using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Server
{
    public class AuthRequest
    {
        [JsonProperty("email")]
        [RequiredAttribute]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [JsonProperty("password")]
        [RequiredAttribute]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
