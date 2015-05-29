using PublishR.Abstractions;
using PublishR.Models;
using PublishR.Social;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace PublishR.Starter.PublicWebApp.Controllers
{
    public class HomeController : Controller
    {
        private IApproval<Page> pages;
        private ITwitterClient twitter;
        private ISettings settings;
        
        [Route("")]
        public async Task<ActionResult> Index()
        {
            var page = await pages.GetApproved(Known.Kind.WebPage, Known.Path.Index);
            var twitterAlias = settings.GetSetting(Known.Provider.Twitter, "alias");
            var twitterResult = await twitter.GetRecentPosts(twitterAlias, 10);

            page.Data.Results.Add(Known.Provider.Twitter, twitterResult);

            ViewData.Model = page;

            return View();
        }

        public HomeController(IApproval<Page> pages, ITwitterClient twitter, ISettings settings)
        {
            this.pages = pages;
            this.twitter = twitter;
            this.settings = settings;
        }
    }
}