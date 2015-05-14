﻿using PublishR.Abstractions;
using PublishR.Helpers;
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

        private string NormalizeString(string text)
        {
            return text
                .Trim()
                .ToLower();
        }

        private DocumentResource<User> GetUser(string email)
        {
            var normalizedEmail = NormalizeString(email);
            var resource = GetItem<DocumentResource<User>>(r => r.Id == normalizedEmail);

            Check.NotFoundIfNull(resource);

            return resource;
        }

        private void ValidateToken(DocumentResource<User> user, string tokenName, string value)
        {
            Token token;

            Check.NotFoundIfNull(user.Tokens);
            Check.NotFoundIfFalse(user.Tokens.TryGetValue(tokenName, out token));
            Check.NotFoundIfNull(token.Value);
            Check.NotFoundIfFalse(time.Now <= token.Expiry);
            Check.NotFoundIfFalse(hasher.ValidateHashString(token.Value, value));
        }

        private bool RevokeToken(DocumentResource<User> user, string tokenName)
        {
            return user.Tokens != null && user.Tokens.Remove(tokenName);
        }

        private Token AddToken(DocumentResource<User> user, string tokenName, string value = null)
        {
            if (user.Tokens == null)
            {
                user.Tokens = new Dictionary<string, Token>();
            }

            var publicToken = new Token()
            {
                Value = value ?? Guid.NewGuid().ToString(),
                Expiry = time.Now.AddDays(30)
            };

            user.Tokens[tokenName] = new Token()
            {
                Value = hasher.HashString(publicToken.Value),
                Expiry = publicToken.Expiry
            };

            return publicToken;
        }

        public async Task<Token> Invite(string email, string[] roles)
        {
            Check.BadRequestIfNull(email);
            Check.BadRequestIfUnmatched(Known.Regex.Email, email);
            Check.BadRequestIfNull(roles);
            Check.BadRequestIfTrue(roles.Length == 0);
            
            var normalizedEmail = NormalizeString(email);
            var user = new DocumentResource<User>()
            {
                Id = normalizedEmail,
                Content = new User()
                {
                    Email = normalizedEmail
                },
                Claims = new Dictionary<string, string[]>()
                {
                    { 
                        session.Workspace, 
                        roles
                    }
                }
            };

            var inviteToken = AddToken(user, Known.Token.Invite);

            await CreateItemAsync(user);

            return inviteToken;
        }

        public async Task Revoke(string email, string role)
        {
            var user = GetUser(email);
            var roles = user.Claims[session.Workspace];

            if (roles == null)
            {
                return;
            }

            roles
                .ToList()
                .RemoveAll(r => r.Equals(role, StringComparison.OrdinalIgnoreCase));

            user.Claims[session.Workspace] = roles.ToArray();

            await UpdateItemAsync(user.Id, user);
        }

        public Task Register(string token, string email, string password)
        {
            var user = GetUser(email);

            ValidateToken(user, Known.Token.Invite, token);
            RevokeToken(user, Known.Token.Invite);
            AddToken(user, Known.Token.Password, password);

            return UpdateItemAsync(user.Id, user);
        }

        public Task<Identity> Authorize(string email, string password)
        {
            var user = GetUser(email);

            ValidateToken(user, Known.Token.Password, password);

            var identity = new Identity()
            {
                Uid = user.Id,
                Email = user.Content.Email,
                Workspace = session.Workspace,
                Roles = user.Claims[session.Workspace],
                Properties = user.Content.Properties
            };

            return Task.FromResult(identity);
        }

        public async Task<Token> Reset(string email)
        {
            var user = GetUser(email);

            Check.BadRequestIfNull(user.Tokens);
            Check.BadRequestIfFalse(user.Tokens.ContainsKey(Known.Token.Password));

            var resetToken = AddToken(user, Known.Token.Reset);

            await UpdateItemAsync(user.Id, user);

            return resetToken;
        }

        public Task ResetPassword(string token, string email, string password)
        {
            var user = GetUser(email);

            ValidateToken(user, Known.Token.Reset, token);
            RevokeToken(user, Known.Token.Reset);
            AddToken(user, Known.Token.Password, password);

            return UpdateItemAsync(user.Id, user);
        }

        public Task ChangePassword(string email, string oldPassword, string newPassword)
        {
            var user = GetUser(email);

            ValidateToken(user, Known.Token.Password, oldPassword);
            AddToken(user, Known.Token.Password, newPassword);

            return UpdateItemAsync(user.Id, user);
        }

        public Task UpdateProfile(string email, IDictionary<string, object> properties)
        {
            var user = GetUser(email);

            user.Metadata.Updated = time.Now;
            user.Content.Properties = DictionaryHelpers.MergeLeft(user.Content.Properties, properties);

            return UpdateItemAsync(user.Id, user);
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