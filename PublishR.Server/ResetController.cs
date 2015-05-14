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
    [RoutePrefix("api/reset")]
    public class ResetController : ApiController
    {
        private IAccounts accounts;

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Reset(string email)
        {
            Check.BadRequestIfNull(email);

            await accounts.Reset(email);

            return Ok();
        }

        [HttpPost]
        [Route("{token}")]
        public async Task<IHttpActionResult> ResetPassword(string token, ResetModel reset)
        {
            Check.BadRequestIfNull(token);
            Check.BadRequestIfNull(reset);
            Check.BadRequestIfInvalid(reset);

            await accounts.ResetPassword(token, reset.Email, reset.Password);

            return Ok();
        }

        public ResetController(IAccounts accounts)
        {
            this.accounts = accounts;
        }
    }
}
