using Autofac;
using Autofac.Integration.WebApi;
using PublishR.Abstractions;
using PublishR.Azure.BlobStorage;
using PublishR.Azure.DocumentDB;
using PublishR.Models;
using PublishR.Server;
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

namespace PublishR.Starter.SharedApiApp
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
                ConfigureRelease(config);
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
            builder.RegisterType<ConfigurationSession>().As<ISession>().SingleInstance();
            builder.RegisterType<SystemClaimsIdentity>().As<IIdentity>().SingleInstance();
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

        private void ConfigureRelease(HttpConfiguration config)
        {
#if !DEBUG
            config.Filters.Add(new RequireHttpsAttribute());
#endif
        }
    }
}