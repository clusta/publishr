using PublishR.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Server
{
    public class SystemClaimsIdentity : IIdentity
    {
        public string Uid
        {
            get
            {
                return ClaimsPrincipal.Current.Identity.Name;
            }
        }

        public string Name
        {
            get
            {
                return ClaimsPrincipal.Current.Identity.Name;
            }
        }

        public bool IsInRole(string roleName)
        {
            return ClaimsPrincipal.Current.IsInRole(roleName);
        }
    }
}
