using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Server
{
    public interface ILogin
    {
        Task<LoginResult> GetLogin(string accessToken);
    }
}
