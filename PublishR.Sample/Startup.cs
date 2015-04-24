using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Owin;
using PublishR.Server;

[assembly: OwinStartup(typeof(PublishR.Sample.Startup))]

namespace PublishR.Sample
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseOAuthBearerAuthentication(AuthController.OAuthOptions);
        }
    }
}