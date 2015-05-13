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
    [RoutePrefix("api/page")]
    public class PageController : ApiController
    {
        private IRepository<Page> repository;
        private IApproval<Page> approval;

        [HttpGet]
        [Route("{id}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            var resource = await repository.Read(id);

            return Ok(resource);
        }

        [HttpPost]
        [Route("")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> Create(CreateModel<Page> model)
        {
            Check.BadRequestIfNull(model);
            Check.BadRequestIfInvalid(model);            
            
            var resource = await repository.Create(model.Kind, model.Path, model.Content);

            Check.BadRequestIfNull(resource);

            return Ok(resource);
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> Update(string id, Page page)
        {
            await repository.Update(id, page);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/submit")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> Submit(string id)
        {
            await approval.Submit(id);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/approve")]
        [Authorize(Roles = Known.Role.Editor)]
        public async Task<IHttpActionResult> Approve(string id)
        {
            await approval.Approve(id);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/reject")]
        [Authorize(Roles = Known.Role.Editor)]
        public async Task<IHttpActionResult> Reject(string id)
        {
            await approval.Reject(id);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/archive")]
        [Authorize(Roles = Known.Role.Editor)]
        public async Task<IHttpActionResult> Archive(string id)
        {
            await approval.Archive(id);

            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = Known.Role.Editor)]
        public async Task<IHttpActionResult> DeletePage(string id)
        {
            await repository.Delete(id);

            return Ok();
        }

        public PageController(IRepository<Page> repository, IApproval<Page> approval)
        {
            this.repository = repository;
            this.approval = approval;
        }
    }
}
