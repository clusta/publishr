using PublishR.Abstractions;
using PublishR.Azure.BlobStorage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace PublishR.Sample.Controllers
{
    [RoutePrefix("api/utility")]
    public class UtilityController : ApiController
    {
        private IHasher hasher;
        private ISettings settings;
        private ISession session;
        private ITime time;
        
        [HttpPost]
        [Route("hash")]
        public IHttpActionResult Hash(string value)
        {
            var hashedString = hasher.HashString(value);

            return Ok(hashedString);
        }

        [HttpPost]
        [Route("cors")]
        public async Task<IHttpActionResult> Cors()
        {
            var blobStorageFiles = new BlobStorageFiles(settings, session, time);

            await blobStorageFiles.EnsureCors();

            return Ok();
        }

        public UtilityController(IHasher hasher, ISettings settings, ISession session, ITime time)
        {
            this.hasher = hasher;
            this.settings = settings;
            this.session = session;
            this.time = time;
        }
    }
}