using PublishR.Abstractions;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace PublishR.Server
{
    [RoutePrefix("api/register")]
    public class RegisterController : ApiController
    {
        private IAccounts accounts;

        [HttpPost]
        [Route("{token}")]
        public async Task<IHttpActionResult> Create(string token, RegisterModel register)
        {
            Check.BadRequestIfNull(token);
            Check.BadRequestIfNull(register);
            Check.BadRequestIfInvalid(register);

            await accounts.Register(token, register.Email, register.Password);

            return Ok();
        }

        public RegisterController(IAccounts accounts)
        {
            this.accounts = accounts;
        }
    }
}
