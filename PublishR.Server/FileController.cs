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
    [RoutePrefix("api/file")]
    public class FileController : ApiController
    {
        private IFiles files;

        [HttpPost]
        [Route("{set}")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> CreateFiles(string set, IDictionary<string, File> model)
        {
            Check.BadRequestIfNull(set);
            Check.BadRequestIfInvalid(model);

            var endpoints = await files.Create(set, model);

            return Ok(endpoints);
        }

        [HttpPut]
        [Route("")]
        [Authorize(Roles = Known.Role.Author)]
        public async Task<IHttpActionResult> Update(string uri, File file)
        {
            var endpoint = await files.Update(uri, file);

            return Ok(endpoint);
        }

        public FileController(IFiles files)
        {
            this.files = files;
        }
    }
}
