using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Newtonsoft.Json.Linq;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace PublishR.Server
{
    public static class LoginHelper
    {
        public static void Configure(IAppBuilder app, string loginPath = "/api/login") 
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
               {
                  AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                  LoginPath = new PathString(loginPath)
               });
        }

        public static void SignIn(IEnumerable<Claim> claims)
        {
            var claimsIndentity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);
            var owinContext = HttpContext.Current.Request.GetOwinContext();
            var authenticationManager = owinContext.Authentication;

            authenticationManager.SignIn(claimsIndentity);
        }

        public static void SignOut()
        {
            var owinContext = HttpContext.Current.Request.GetOwinContext();
            var authenticationManager = owinContext.Authentication;

            authenticationManager.SignOut();
        }

        public static async Task<string> GetGoogleAuthEmailAddress(string accessToken)
        {
            using (var httpClient = new HttpClient())
            {
                var tokenInfoUri = string.Format("https://www.googleapis.com/oauth2/v2/tokeninfo?access_token={0}&fields=email", accessToken);
                var httpResponse = await httpClient.PostAsync(tokenInfoUri, null);
                var tokenInfo = await httpResponse.Content.ReadAsAsync<JObject>();

                return (string)tokenInfo["email"];
            }
        }
    }
}
