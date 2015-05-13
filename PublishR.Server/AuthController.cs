using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web;
using Microsoft.Owin;
using System.Net.Http;
using System.Security.Claims;
using Microsoft.Owin.Security.OAuth;
using PublishR.Abstractions;

namespace PublishR.Server
{
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        private IAccounts accounts;

        private static OAuthBearerAuthenticationOptions oauthOptions;

        public static OAuthBearerAuthenticationOptions OAuthOptions
        {
            get
            {
                return oauthOptions ?? (oauthOptions = new OAuthBearerAuthenticationOptions());
            }
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Authorize(AuthRequest request)
        {
            Check.BadRequestIfNull(request);
            Check.BadRequestIfInvalid(request);

            var authenticationManager = Request.GetOwinContext().Authentication;
            var identity = await accounts.Authorize(request.Email, request.Password);

            Check.UnauthorizedIfNull(identity);
            Check.UnauthorizedIfNull(identity.Uid);

            var claims = new List<Claim>() 
            {
                new Claim(ClaimTypes.NameIdentifier, identity.Uid)
            };

            if (!string.IsNullOrEmpty(identity.Email))
            {
                claims.Add(new Claim(ClaimTypes.Email, identity.Email));
            }

            if (identity.Roles != null && identity.Roles.Length > 0)
            {
                claims.AddRange(identity.Roles.Select(role => new Claim(ClaimTypes.Role, role)).ToList());
            }

            var claimsIdentity = new ClaimsIdentity(claims, OAuthOptions.AuthenticationType);
            var authenticationTicket = new AuthenticationTicket(claimsIdentity, new AuthenticationProperties());
            var accessToken = OAuthOptions.AccessTokenFormat.Protect(authenticationTicket);

            identity.AcccessToken = accessToken;

            return Ok(identity);
        }

        public AuthController(IAccounts accounts)
        {
            this.accounts = accounts;
        }
    }
}
