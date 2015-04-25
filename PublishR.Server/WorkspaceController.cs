﻿using System;
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
        public async Task<IHttpActionResult> CreateWorkspace(CreateDocumentModel model)
        {
            Check.BadRequestIfNull(model);
            Check.BadRequestIfInvalid(model);
            
            var id = await workspaces.CreateWorkspace(model.Kind, model.Slug, model.Card);
            var resource = new Resource()
            {
                Id = id
            };

            return Ok(resource);
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize(Roles = Known.Role.Administrator)]
        public async Task<IHttpActionResult> GetWorkspace(string id)
        {
            var workspace = await workspaces.GetWorkspace(id);

            return Ok(workspace);
        }

        [HttpPut]
        [Route("{id}/cards")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> UpdateCards(string id, IDictionary<string, Card> cards)
        {
            await workspaces.UpdateCards(id, cards);

            return Ok();
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
