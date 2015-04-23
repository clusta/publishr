using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace PublishR.Server
{
    [RoutePrefix("api/workspace")]
    public class WorkspaceController : ApiController
    {
        private IWorkspaces workspaces;

        [HttpPost]
        [Route("")]
        [Authorize(Roles = Known.Role.Administrator)]
        public async Task<IHttpActionResult> AddWorkspace(string slug, string name)
        {
            var id = await workspaces.AddWorkspace(slug, name);
            var resource = new Resource()
            {
                Id = id
            };

            return Ok(resource);
        }

        [HttpPut]
        [Route("{id}/properties")]
        [Authorize(Roles = Known.Role.Administrator)]
        public async Task<IHttpActionResult> UpdateProperties(string id, IDictionary<string, object> properties)
        {
            await workspaces.UpdateProperties(id, properties);

            return Ok();
        }

        public WorkspaceController(IWorkspaces workspaces)
        {
            this.workspaces = workspaces;
        }
    }
}
