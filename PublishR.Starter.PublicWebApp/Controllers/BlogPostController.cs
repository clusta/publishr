using PublishR.Abstractions;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace PublishR.Starter.PublicWebApp.Controllers
{
    public class BlogPostController : Controller
    {
        private ISearch search;
        private IApproval<Page> pages;

        [Route("blog")]
        public async Task<ActionResult> Index()
        {
            ViewData.Model = await search.Search(Known.Kind.BlogPost, null, null);

            return View();
        }

        [Route("blog/{path}")]
        public async Task<ActionResult> Details(string path)
        {
            ViewData.Model = await pages.GetApproved(Known.Kind.BlogPost, path);
            
            return View();
        }

        public BlogPostController(ISearch search, IApproval<Page> pages)
        {
            this.search = search;
            this.pages = pages;
        }
    }
}