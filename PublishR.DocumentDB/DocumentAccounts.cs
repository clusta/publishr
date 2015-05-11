using PublishR.Abstractions;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.DocumentDB
{
    public class DocumentAccounts : DocumentStorage, IAccounts
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

        public async Task<Token> Invite(string email, string[] roles)
        {
            Check.BadRequestIfNull(email);
            Check.BadRequestIfUnmatched(Known.Regex.Email, email);
            Check.BadRequestIfNull(roles);
            
            var inviteToken = new Token() 
            {
                Value = Guid.NewGuid().ToString(),
                Expiry = time.Now.AddDays(30)
            };
            var normalizedEmail = NormalizeString(email);

            var resource = new DocumentResource<User>()
            {
                Id = normalizedEmail,
                Content = new User()
                {
                    Email = normalizedEmail
                },
                Tokens = new Dictionary<string, Token>()
                {
                    { 
                        RegistrationTokenKey, 
                        inviteToken
                    }
                },
                Claims = new Dictionary<string, string[]>()
                {
                    { 
                        session.Website, 
                        roles
                    }
                }
            };

            await CreateItemAsync(resource);

            return inviteToken;
        }

        public Task Revoke(string email, string role)
        {
            throw new NotImplementedException();
        }

        public Task Register(string token, string email, string password)
        {
            var normalizedEmail = NormalizeString(email);
            var resource = GetItem<DocumentResource<User>>(r => r.Id == normalizedEmail);

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

            return UpdateItemAsync(normalizedEmail, resource);
        }

        public Task<Identity> Authorize(string email, string password)
        {
            var normalizedEmail = NormalizeString(email);
            var resource = GetItem<DocumentResource<User>>(r => r.Id == normalizedEmail);

            Check.UnauthorizedIfNull(resource);
            Check.UnauthorizedIfNull(resource.Tokens);
            Check.UnauthorizedIfNull(resource.Tokens[PasswordTokenKey]);
            Check.UnauthorizedIfFalse(time.Now <= resource.Tokens[PasswordTokenKey].Expiry);
            Check.UnauthorizedIfFalse(hasher.ValidateHashString(resource.Tokens[PasswordTokenKey].Value, password));

            var identity = new Identity()
            {
                Uid = resource.Id,
                Email = normalizedEmail,
                Workspace = session.Website,
                Properties = resource.Content.Properties
            };

            return Task.FromResult(identity);
        }

        public Task<Token> Reset(string email)
        {
            throw new NotImplementedException();
        }

        public Task ResetPassword(string token, string password)
        {
            throw new NotImplementedException();
        }

        public Task ChangePassword(string email, string oldPassword, string newPassword)
        {
            throw new NotImplementedException();
        }

        public Task UpdateProfile(string email, IDictionary<string, object> properties)
        {
            throw new NotImplementedException();
        }

        public DocumentAccounts(ISession session, IHasher hasher, ISettings settings, ITime time) 
            : base(settings, Known.Collections.Users)
        {
            this.session = session;
            this.hasher = hasher;
            this.time = time;
        }
    }
}