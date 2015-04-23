using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace PublishR.Server
{
    [RoutePrefix("api/search")]
    public class SearchController : ApiController
    {
        private ISearch search;

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> GetFacets()
        {
            var facets = await search.GetFacets();

            return Ok(facets);
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Query(IDictionary<string, object> facets)
        {
            var collection = await search.Query(facets);

            return Ok(collection);
        }

        public SearchController(ISearch search)
        {
            this.search = search;
        }
    }
}
