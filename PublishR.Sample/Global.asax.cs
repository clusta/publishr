using Autofac;
using Autofac.Integration.WebApi;
using PublishR;
using PublishR.Azure.DocumentDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using System.Web.SessionState;
using Microsoft.Owin.Security.OAuth;
using Owin;
using PublishR.Server;
using System.Threading.Tasks;
using System.Security.Claims;
using PublishR.Abstractions;
using PublishR.Models;
using PublishR.Azure.BlobStorage;
using PublishR.Social.Facebook;
using PublishR.Social;
using PublishR.Social.Tumblr;
using PublishR.Social.Instagram;
using PublishR.Social.Twitter;

namespace PublishR.Sample
{
    public class Global : HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            GlobalConfiguration.Configure(config =>
            {
                ConfigureApi(config);
                ConfigureAuthentication(config);
                ConfigureDebug(config);
                ConfigureServices(config);
            });
        }

        private void ConfigureApi(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            config.Formatters.Remove(config.Formatters.XmlFormatter);
            config.Filters.Add(new GlobalExceptionFilter());
        }

        private void ConfigureAuthentication(HttpConfiguration config)
        {
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter("Bearer"));
        }

        private void ConfigureServices(HttpConfiguration config)
        {
            var builder = new ContainerBuilder();

            builder.RegisterType<ConfigurationSettings>().As<ISettings>().SingleInstance();
            builder.RegisterType<SystemTime>().As<ITime>().SingleInstance();
            builder.RegisterType<SampleSession>().As<ISession>().SingleInstance();            
            builder.RegisterType<SampleIdentity>().As<IIdentity>().SingleInstance();
            builder.RegisterType<CryptoHasher>().As<IHasher>().SingleInstance();
            builder.RegisterType<DocumentDBAccounts>().As<IAccounts>().SingleInstance();
            builder.RegisterType<DocumentDBSearch>().As<ISearch>().InstancePerRequest();
            builder.RegisterType<BlobStorageFiles>().As<IFiles>().InstancePerRequest();

            builder.RegisterType<DocumentDBRepository<Page>>()
                .As<IRepository<Page>>()
                .As<IApproval<Page>>()
                .As<ICollections>()
                .InstancePerRequest()
                .WithParameter("collectionId", Known.Collections.Pages);
            
            builder.RegisterType<DocumentDBRepository<Comment>>()
                .As<IRepository<Comment>>()
                .As<IApproval<Comment>>()
                .InstancePerRequest()
                .WithParameter("collectionId", Known.Collections.Comments);

            builder.RegisterType<DocumentDBRepository<Creative>>()
                .As<IRepository<Creative>>()
                .InstancePerRequest()
                .WithParameter("collectionId", Known.Collections.Creatives);

            builder.RegisterType<FacebookClient>().As<IFacebookClient>().InstancePerRequest();
            builder.RegisterType<TumblrClient>().As<ITumblrClient>().InstancePerRequest();
            builder.RegisterType<InstagramClient>().As<IInstagramClient>().InstancePerRequest();
            builder.RegisterType<TwitterClient>().As<ITwitterClient>().InstancePerRequest();

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterApiControllers(typeof(AuthController).Assembly);

            var container = builder.Build();
            var resolver = new AutofacWebApiDependencyResolver(container);

            config.DependencyResolver = resolver;
        }

        private void ConfigureDebug(HttpConfiguration config)
        {
#if DEBUG
            config.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;
#endif
        }
    }

    public class SampleSession : ISession
    {
        public string Workspace
        {
            get 
            {
                return "publishr";
            }
        }
    }

    public class SampleIdentity : IIdentity
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

    public class SampleAccounts : IAccounts
    {
        private ISession session;
        
        public Task<Token> Invite(string email, string[] roles)
        {
            throw new NotImplementedException();
        }

        public Task Revoke(string email, string role)
        {
            throw new NotImplementedException();
        }

        public Task Register(string token, string email, string password)
        {
            throw new NotImplementedException();
        }

        public Task<Identity> Authorize(string email, string password)
        {
            var identity = new Identity()
            {
                Uid = email,
                Email = email,
                Roles = new string[] 
                { 
                    Known.Role.Author,
                    Known.Role.Editor
                },
                Workspace = session.Workspace
            };

            return Task.FromResult(identity);
        }

        public Task<Token> Reset(string email)
        {
            throw new NotImplementedException();
        }

        public Task ResetPassword(string token, string email, string password)
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

        public SampleAccounts(ISession session)
        {
            this.session = session;
        }
    }
}