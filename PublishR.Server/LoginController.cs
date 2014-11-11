using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace PublishR.Server
{
    public class LoginController : ApiController
    {
        private ILogin login;

        #if !DEBUG
        [RequireHttps]
        #endif
        public async Task<HttpResponseMessage> Post(string accessToken)
        {
            var loginResult = await login.GetLogin(accessToken);

            if (loginResult.Success)
            {
                LoginHelper.SignIn(loginResult.Claims);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.Unauthorized, loginResult.Message);
            }
        }

        public IHttpActionResult Delete()
        {
            LoginHelper.SignOut();

            return Ok();
        }

        public LoginController(ILogin login)
        {
            this.login = login;
        }
    }
}
