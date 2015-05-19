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
    [RoutePrefix("api/creative")]
    public class CreativeController : ApiController
    {
        private IRepository<Creative> repository;

        [HttpPost]
        [Route("")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> Create(CreateModel<Creative> model)
        {
            Check.BadRequestIfNull(model);
            Check.BadRequestIfInvalid(model);            
            
            var resource = await repository.Create(model.Kind, model.Path, model.Content);

            Check.BadRequestIfNull(resource);

            return Ok(resource);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IHttpActionResult> Read(string id)
        {
            var resource = await repository.Read(id);

            return Ok(resource);
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> Update(string id, Creative creative)
        {
            await repository.Update(id, creative);

            return Ok();
        }

        public CreativeController(IRepository<Creative> repository)
        {
            this.repository = repository;
        }
    }
}
