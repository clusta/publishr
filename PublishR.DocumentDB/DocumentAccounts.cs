using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.DocumentDB
{
    public class DocumentAccounts : DocumentStore, IAccounts
    {
        private ISession session;
        private IHasher hashService;
        private ITime time;

        public const string RegistrationTokenKey = "registration";
        
        public async Task<string> Invite(string email, string role)
        {
            var token = Guid.NewGuid().ToString();
            var resource = new DocumentResource<User>()
            {
                Id = BuildDocumentId(session.Workspace, "user", email),
                Workspace = session.Workspace,
                Data = new User()
                {
                    Email = email
                },
                Tokens = new Dictionary<string, Token>()
                {
                    { 
                        RegistrationTokenKey, 
                        new Token() 
                        {
                            Value = token,
                            Expiry = time.Now.AddDays(30)
                        }
                    }
                }
            };

            await CreateItemAsync(resource);

            return token;
        }

        public Task Revoke(string email, string role)
        {
            throw new NotImplementedException();
        }

        public Task Register(string token, string email, string password)
        {
            throw new NotImplementedException();
        }

        public Task<IDictionary<string, object>> Authorize(string email, string password)
        {
            throw new NotImplementedException();
        }

        public Task<string> Reset(string email)
        {
            throw new NotImplementedException();
        }

        public Task UpdatePassword(string token, string password)
        {
            throw new NotImplementedException();
        }

        public Task UpdatePassword(string email, string oldPassword, string newPassword)
        {
            throw new NotImplementedException();
        }

        public Task UpdateProfile(string email, IDictionary<string, object> properties)
        {
            throw new NotImplementedException();
        }

        public DocumentAccounts(ISession session, IHasher hasher, ISettings settings, ITime time) 
            : base(settings, "publishr.accounts")
        {
            this.session = session;
            this.hashService = hasher;
            this.time = time;
        }
    }
}