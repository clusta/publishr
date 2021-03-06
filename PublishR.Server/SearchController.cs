﻿using PublishR.Abstractions;
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
        [Route("{kind}")]
        public async Task<IHttpActionResult> GetFacets(string kind)
        {
            var facets = await search.GetFacets(kind);

            return Ok(facets);
        }

        [HttpPost]
        [Route("{kind}")]
        public async Task<IHttpActionResult> Search(string kind, IDictionary<string, object> facets)
        {
            var result = await search.Search(kind, facets, null);

            return Ok(result);
        }

        public SearchController(ISearch search)
        {
            this.search = search;
        }
    }
}
