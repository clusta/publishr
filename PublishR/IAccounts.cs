using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface IAccounts
    {
        Task<string> Invite(string email, string role);
        Task Revoke(string email, string role);  
        Task Register(string token, string email, string password);
        Task<Identity> Authorize(string email, string password);
        Task<string> Reset(string email);
        Task UpdatePassword(string token, string password);
        Task UpdatePassword(string email, string oldPassword, string newPassword);
        Task UpdateProfile(string email, IDictionary<string, object> properties);
    }
}
