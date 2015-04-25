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
        private IPages pages;

        [HttpGet]
        [Route("{id}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            var page = await pages.GetPage(id);

            return Ok(page);
        }

        [HttpPost]
        [Route("")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> CreatePage(CreateDocumentModel model)
        {
            Check.BadRequestIfNull(model);
            Check.BadRequestIfInvalid(model);            
            
            var id = await pages.CreatePage(model.Kind, model.Slug, model.Card);
            var resource = new Resource()
            {
                Id = id
            };

            return Ok(resource);
        }

        [HttpPut]
        [Route("{id}/cards")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> UpdateCards(string id, IDictionary<string, Card> cards)
        {
            await pages.UpdateCards(id, cards);

            return Ok();
        }

        [HttpPut]
        [Route("{id}/properties")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> UpdateProperties(string id, IDictionary<string, object> properties)
        {
            await pages.UpdateProperties(id, properties);

            return Ok();
        }

        [HttpPut]
        [Route("{id}/tags")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> UpdateTags(string id, string[] tags)
        {
            await pages.UpdateTags(id, tags);

            return Ok();
        }

        [HttpPut]
        [Route("{id}/metadata")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> UpdateMetadata(string id, Metadata metadata)
        {
            await pages.UpdateMetadata(id, metadata);

            return Ok();
        }

        [HttpPut]
        [Route("{id}/sections")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> UpdateSections(string id, IList<Section> sections)
        {
            await pages.UpdateSections(id, sections);

            return Ok();
        }

        [HttpPut]
        [Route("{id}/credits")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> UpdateCredits(string id, IList<Credit> credits)
        {
            await pages.UpdateCredits(id, credits);

            return Ok();
        }

        [HttpPut]
        [Route("{id}/schedules")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> UpdateSchedules(string id, IList<Schedule> schedules)
        {
            await pages.UpdateSchedules(id, schedules);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/submit")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> SubmitPage(string id)
        {
            await pages.SubmitPage(id);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/approve")]
        [Authorize(Roles = Known.Role.Editor)]
        public async Task<IHttpActionResult> ApprovePage(string id)
        {
            await pages.ApprovePage(id);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/reject")]
        [Authorize(Roles = Known.Role.Editor)]
        public async Task<IHttpActionResult> RejectPage(string id)
        {
            await pages.RejectPage(id);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/archive")]
        [Authorize(Roles = Known.Role.Editor)]
        public async Task<IHttpActionResult> ArchivePage(string id)
        {
            await pages.ArchivePage(id);

            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = Known.Role.Editor)]
        public async Task<IHttpActionResult> DeletePage(string id)
        {
            await pages.DeletePage(id);

            return Ok();
        }

        public PageController(IPages pages)
        {
            this.pages = pages;
        }
    }
}
