using Autofac;
using Autofac.Integration.WebApi;
using PublishR;
using PublishR.DocumentDB;
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

namespace PublishR.Sample
{
    public class Global : HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            GlobalConfiguration.Configure(config =>
            {
                config.MapHttpAttributeRoutes();
                config.Formatters.Remove(config.Formatters.XmlFormatter);

                config.Filters.Add(new GlobalExceptionFilter());
#if DEBUG
                config.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;
#endif
                config.SuppressDefaultHostAuthentication();
                config.Filters.Add(new HostAuthenticationFilter("Bearer"));

                var builder = new ContainerBuilder();

                builder.RegisterType<ConfigurationSettings>().As<ISettings>().SingleInstance();
                builder.RegisterType<SystemTime>().As<ITime>().SingleInstance();
                builder.RegisterType<SampleSession>().As<ISession>().SingleInstance();
                builder.RegisterType<SampleAccounts>().As<IAccounts>().SingleInstance();
                builder.RegisterType<SampleIdentity>().As<IIdentity>().SingleInstance();
                builder.RegisterType<DocumentPages>().As<IPages>().InstancePerRequest();
                builder.RegisterType<DocumentCollections>().As<ICollections>().InstancePerRequest();
                builder.RegisterType<DocumentSearch>().As<ISearch>().InstancePerRequest();
                builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
                builder.RegisterApiControllers(typeof(AuthController).Assembly);

                var container = builder.Build();
                var resolver = new AutofacWebApiDependencyResolver(container);

                config.DependencyResolver = resolver;
            });
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
        
        public Task<string> Invite(string email, string role)
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

        public SampleAccounts(ISession session)
        {
            this.session = session;
        }
    }
}