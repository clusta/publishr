﻿using PublishR.Abstractions;
using PublishR.Models;
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
        private IRepository<Comment> repository;
        private IApproval<Comment> approval;

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get(string path)
        {
            var list = await repository.List(Known.Kind.Comment, path);
            var orderedList = list.OrderBy(l => l.Meta.Created).ToList();

            return Ok(orderedList);
        }

        [HttpPost]
        [Route("")]
        [Authorize]
        public async Task<IHttpActionResult> Create(CreateModel<Comment> model)
        {
            Check.BadRequestIfNull(model);
            Check.BadRequestIfInvalid(model);
            Check.BadRequestIfNull(model.Data);
            Check.BadRequestIfNull(model.Data.Text);

            var resource = await repository.Create(Known.Kind.Comment, model.Path, model.Data);

            Check.BadRequestIfNull(resource);

            return Ok(resource);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IHttpActionResult> Read(string id)
        {
            var comment = await repository.Read(id);

            return Ok(comment);
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = Known.Role.Moderator)]
        public async Task<IHttpActionResult> Update(string id, Comment comment)
        {
            await repository.Update(id, comment);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/approve")]
        [Authorize(Roles = Known.Role.Moderator)]
        public async Task<IHttpActionResult> Approve(string id)
        {
            await approval.Approve(id);

            return Ok();
        }

        [HttpPost]
        [Route("{id}/reject")]
        [Authorize(Roles = Known.Role.Moderator)]
        public async Task<IHttpActionResult> Reject(string id)
        {
            await approval.Reject(id);

            return Ok();
        }

        public CommentController(IRepository<Comment> repository, IApproval<Comment> approval)
        {
            this.repository = repository;
            this.approval = approval;
        }
    }
}
