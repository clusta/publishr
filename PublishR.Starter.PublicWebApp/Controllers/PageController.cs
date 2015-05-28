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
    public class PageController : Controller
    {
        private IRepository<Page> pages;
        
        [Route("{id}")]
        public async Task<ActionResult> Details(string id)
        {
            ViewData.Model = await pages.Read(id);
            
            return View();
        }

        public PageController(IRepository<Page> pages)
        {
            this.pages = pages;
        }
    }
}