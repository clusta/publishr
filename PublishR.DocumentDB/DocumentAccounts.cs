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
        private IHasher hasher;
        private ITime time;

        public const string RegistrationTokenKey = "registration";
        public const string PasswordTokenKey = "password";
        
        public const string UserKind = "user";

        private string NormalizeString(string text)
        {
            return text
                .Trim()
                .ToLower();
        }

        public async Task<string> Invite(string email, string role)
        {
            Check.BadRequestIfNull(email);
            Check.BadRequestIfUnmatched(Known.Regex.Email, email);
            Check.BadRequestIfNull(role);
            
            var token = Guid.NewGuid().ToString();
            var normalizedEmail = NormalizeString(email);
            var resource = new DocumentResource<User>()
            {
                Id = BuildDocumentId(session.Workspace, UserKind, normalizedEmail),
                Workspace = session.Workspace,
                Data = new User()
                {
                    Email = normalizedEmail
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
                },
                Grants = new Dictionary<string, string[]>()
                {
                    { 
                        session.Workspace, 
                        new string[] 
                        { 
                            role 
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

        public async Task Register(string token, string email, string password)
        {
            var normalizedEmail = NormalizeString(email);
            var id = BuildDocumentId(session.Workspace, UserKind, email);

            var resource = GetItem<DocumentResource<User>>(r => r.Id == id);

            Check.NotFoundIfNull(resource);
            Check.NotFoundIfNull(resource.Tokens);
            Check.NotFoundIfNull(resource.Tokens[RegistrationTokenKey]);
            Check.NotFoundIfFalse(resource.Tokens[RegistrationTokenKey].Value.Equals(token));
            Check.NotFoundIfFalse(time.Now <= resource.Tokens[RegistrationTokenKey].Expiry);

            resource.Tokens[RegistrationTokenKey] = null;
            resource.Tokens[PasswordTokenKey] = new Token
            {
                Value = hasher.HashString(password),
                Expiry = time.Now.AddYears(30)
            };

            await UpdateItemAsync(id, resource);
        }

        public Task<Identity> Authorize(string email, string password)
        {
            var normalizedEmail = NormalizeString(email);
            var id = BuildDocumentId(session.Workspace, UserKind, email);

            var resource = GetItem<DocumentResource<User>>(r => r.Id == id);

            Check.UnauthorizedIfNull(resource);
            Check.UnauthorizedIfNull(resource.Tokens);
            Check.UnauthorizedIfNull(resource.Tokens[PasswordTokenKey]);
            Check.UnauthorizedIfFalse(time.Now <= resource.Tokens[PasswordTokenKey].Expiry);
            Check.UnauthorizedIfFalse(hasher.ValidateHashString(resource.Tokens[PasswordTokenKey].Value, password));

            var identity = new Identity()
            {
                Uid = resource.Id,
                Email = normalizedEmail,
                Workspace = session.Workspace,
                Properties = resource.Data.Properties
            };

            return Task.FromResult(identity);
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
            this.hasher = hasher;
            this.time = time;
        }
    }
}