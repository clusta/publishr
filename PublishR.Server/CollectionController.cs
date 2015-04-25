using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace PublishR.Server
{
    [RoutePrefix("api/collection")]
    public class CollectionController : ApiController
    {
        private ICollections collections;

        [HttpGet]
        [Route("{id}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            var collection = await collections.GetCollection(id);

            return Ok(collection);
        }

        [HttpPost]
        [Route("")]
        [Authorize(Roles = Known.Role.Editor)]
        public async Task<IHttpActionResult> CreateCollection(CreateDocumentModel model)
        {
            Check.BadRequestIfNull(model);
            Check.BadRequestIfInvalid(model);
            
            var id = await collections.CreateCollection(model.Kind, model.Slug, model.Card);
            var resource = new Resource()
            {
                Id = id
            };

            return Ok(resource);
        }


        [HttpPut]
        [Route("{id}/properties")]
        [Authorize(Roles = Known.Role.Editor)]
        public async Task<IHttpActionResult> UpdateProperties(string id, IDictionary<string, object> properties)
        {
            await collections.UpdateProperties(id, properties);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/listings")]
        [Authorize(Roles = Known.Role.Editor)]
        public async Task<IHttpActionResult> AppendListings(string id, string[] listings)
        {
            await collections.AppendListings(id, listings);

            return Ok();
        }

        [HttpPut]
        [Route("{id}/listings")]
        [Authorize(Roles = Known.Role.Editor)]
        public async Task<IHttpActionResult> UpdateListings(string id, string[] listings)
        {
            await collections.UpdateListings(id, listings);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/approve")]
        [Authorize(Roles = Known.Role.Editor)]
        public async Task<IHttpActionResult> ApproveCollection(string id)
        {
            await collections.ApproveCollection(id);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/archive")]
        [Authorize(Roles = Known.Role.Editor)]
        public async Task<IHttpActionResult> ArchiveCollection(string id)
        {
            await collections.ArchiveCollection(id);

            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = Known.Role.Editor)]
        public async Task<IHttpActionResult> DeleteCollection(string id)
        {
            await collections.DeleteCollection(id);

            return Ok();
        }

        public CollectionController(ICollections collections)
        {
            this.collections = collections;
        }
    }
}
