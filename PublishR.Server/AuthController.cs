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

namespace PublishR.Server
{
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        private IAccounts accounts;

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Authorize(AuthRequest request)
        {
            Check.BadRequestIfNull(request);
            Check.BadRequestIfInvalid(request);

            var authenticationManager = Request.GetOwinContext().Authentication;
            var identity = await accounts.Authorize(request.Email, request.Password);

            var claims = new List<Claim>() 
            {
                new Claim(ClaimTypes.NameIdentifier, identity.Uid),
                new Claim(ClaimTypes.Email, identity.Email)
            };

            claims.AddRange(identity.Roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var oauthBearerOptions = new OAuthBearerAuthenticationOptions();
            var claimsIdentity = new ClaimsIdentity(claims, oauthBearerOptions.AuthenticationType);
            var authenticationTicket = new AuthenticationTicket(claimsIdentity, new AuthenticationProperties());
            var accessToken = oauthBearerOptions.AccessTokenFormat.Protect(authenticationTicket);

            identity.AccessToken = accessToken;

            return Ok(identity);
        }

        public AuthController(IAccounts accounts)
        {
            this.accounts = accounts;
        }
    }
}
