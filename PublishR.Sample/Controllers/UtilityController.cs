using PublishR.Abstractions;
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
        
        [HttpPost]
        [Route("hash")]
        public IHttpActionResult Hash(string value)
        {
            var hashedString = hasher.HashString(value);

            return Ok(hashedString);
        }

        public UtilityController(IHasher hasher)
        {
            this.hasher = hasher;
        }
    }
}