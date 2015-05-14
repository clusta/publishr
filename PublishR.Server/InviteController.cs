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
    [RoutePrefix("api/invite")]
    public class InviteController : ApiController
    {
        private IAccounts accounts;

        [HttpPost]
        [Route("")]
        [Authorize(Roles = Known.Role.Owner)]
        public async Task<IHttpActionResult> Invite(InviteModel invite)
        {
            Check.BadRequestIfNull(invite);
            Check.BadRequestIfInvalid(invite);

            var inviteToken = await accounts.Invite(invite.Email, invite.Roles);

            return Ok(inviteToken);
        }

        public InviteController(IAccounts accounts)
        {
            this.accounts = accounts;
        }
    }
}
