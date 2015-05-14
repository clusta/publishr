using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Server
{
    public class InviteModel
    {
        [JsonProperty("email")]
        [DataType(DataType.EmailAddress)]
        [RequiredAttribute]
        public string Email { get; set; }        
        
        [JsonProperty("roles")]
        [RequiredAttribute]
        public string[] Roles { get; set; }
    }
}
