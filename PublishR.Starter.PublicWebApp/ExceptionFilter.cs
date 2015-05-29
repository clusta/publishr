using PublishR.Helpers;
using PublishR.Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace PublishR.Starter.PublicWebApp
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext filterContext)
        {
            filterContext.Result = new HttpStatusCodeResult(ExceptionHelpers.GetHttpStatusCode(filterContext.Exception));
            filterContext.ExceptionHandled = true;
        }
    }
}