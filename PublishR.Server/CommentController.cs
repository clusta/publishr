using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace PublishR.Server
{
    [RoutePrefix("api/comment")]
    public class CommentController : ApiController
    {
        private IComments comments;

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get(string uri)
        {
            var list = await comments.GetComments(uri);

            return Ok(list);
        }

        [HttpPost]
        [Route("")]
        [Authorize]
        public async Task<IHttpActionResult> CreateComment(CreateCommentModel model)
        {
            Check.BadRequestIfNull(model);
            Check.BadRequestIfInvalid(model);
            Check.BadRequestIfNull(model.Text);
            Check.BadRequestIfNull(model.Text.Content);
            
            var id = await comments.CreateComment(model.Uri, model.Text);
            var resource = new Resource()
            {
                Id = id
            };

            return Ok(resource);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IHttpActionResult> GetComment(string id)
        {
            var comment = await comments.GetComment(id);

            return Ok(comment);
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = Known.Role.Moderator)]
        public async Task<IHttpActionResult> UpdateComment(string id, Block content)
        {
            await comments.UpdateComment(id, content);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/approve")]
        [Authorize(Roles = Known.Role.Moderator)]
        public async Task<IHttpActionResult> ApproveComment(string id)
        {
            await comments.ApproveComment(id);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/reject")]
        [Authorize(Roles = Known.Role.Moderator)]
        public async Task<IHttpActionResult> RejectComment(string id)
        {
            await comments.RejectComment(id);

            return Ok();
        }

        public CommentController(IComments comments)
        {
            this.comments = comments;
        }
    }
}
