using PublishR.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PublishR.Abstractions
{
    public interface IAccounts
    {
        Task<Token> Invite(string email, string[] roles);
        Task Revoke(string email, string role);  
        Task Register(string token, string email, string password);
        Task<Identity> Authorize(string email, string password);
        Task<Token> Reset(string email);
        Task ResetPassword(string token, string email, string password);
        Task ChangePassword(string email, string oldPassword, string newPassword);
        Task UpdateProfile(string email, IDictionary<string, object> properties);
    }
}
