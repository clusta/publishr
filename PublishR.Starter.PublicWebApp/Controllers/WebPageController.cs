﻿using PublishR.Abstractions;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace PublishR.Starter.PublicWebApp.Controllers
{
    public class WebPageController : Controller
    {
        private IApproval<Page> pages;
        
        [Route("{path:not(blog)}")]
        public async Task<ActionResult> Details(string path)
        {
            ViewData.Model = await pages.GetApproved(Known.Kind.WebPage, path);
            
            return View();
        }

        public WebPageController(IApproval<Page> pages)
        {
            this.pages = pages;
        }
    }
}