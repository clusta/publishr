using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using PublishR.Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: OwinStartup(typeof(PublishR.Starter.SharedApiApp.Startup))]

namespace PublishR.Starter.SharedApiApp
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);
            app.UseOAuthBearerAuthentication(AuthController.OAuthOptions);
        }
    }
}