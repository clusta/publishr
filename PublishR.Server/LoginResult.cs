using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Server
{
    public class LoginResult
    {
        public bool Success { get; private set; }
        public string Message { get; private set; }
        public IEnumerable<Claim> Claims { get; private set; }

        public LoginResult(bool success, string message, IEnumerable<Claim> claims)
        {
            Success = success;
            Message = message;
            Claims = claims;
        }
    }
}
