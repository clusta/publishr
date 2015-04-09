using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface IAccountService
    {
        Task<string> Invite(string uri, string email, string role);
        Task Revoke(string uri, string email, string role);  
        Task Register(string token, string email, string password);
        Task<IDictionary<string, object>> Authorize(string email, string password);
        Task<string> Reset(string email);
        Task UpdatePassword(string token, string password);
        Task UpdatePassword(string email, string oldPassword, string newPassword);
        Task UpdateProfile(string email, IDictionary<string, object> properties);
    }
}
