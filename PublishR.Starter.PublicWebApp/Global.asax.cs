using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Mvc;
using Autofac;
using PublishR.Abstractions;
using PublishR.Azure.DocumentDB;
using PublishR.Models;
using PublishR.Server;
using Autofac.Integration.Mvc;
using PublishR.Social.Twitter;
using PublishR.Social;
using System.Web.Mvc.Routing;

namespace PublishR.Starter.PublicWebApp
{
    public class Global : HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            ConfigureRoutes(RouteTable.Routes);
            ConfigureFilters(GlobalFilters.Filters);
            ConfigureServices();
        }

        private void ConfigureRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            var constraintsResolver = new DefaultInlineConstraintResolver();

            constraintsResolver.ConstraintMap.Add("not", typeof(NotEqualConstraint));

            routes.MapMvcAttributeRoutes(constraintsResolver);
        }

        private void ConfigureFilters(GlobalFilterCollection filters)
        {
            //filters.Add(new ExceptionFilter());
        }

        private void ConfigureServices()
        {
            var builder = new ContainerBuilder();

            builder.RegisterType<ConfigurationSettings>().As<ISettings>().SingleInstance();
            builder.RegisterType<SystemTime>().As<ITime>().SingleInstance();
            builder.RegisterType<ConfigurationSession>().As<ISession>().SingleInstance();
            builder.RegisterType<SystemClaimsIdentity>().As<IIdentity>().SingleInstance();
            builder.RegisterType<DocumentDBSearch>().As<ISearch>().InstancePerRequest();
            builder.RegisterType<TwitterClient>().As<ITwitterClient>().InstancePerRequest();

            builder.RegisterType<DocumentDBRepository<Page>>()
                .As<IRepository<Page>>()
                .As<IApproval<Page>>()
                .As<IAssociations>()
                .InstancePerRequest()
                .WithParameter("collectionId", Known.Collections.Pages);

            builder.RegisterControllers(typeof(PublishR.Starter.PublicWebApp.Global).Assembly);

            var container = builder.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}