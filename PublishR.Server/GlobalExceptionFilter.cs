using PublishR.Exceptions;
using PublishR.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Filters;

namespace PublishR.Server
{
    public class GlobalExceptionFilter : ExceptionFilterAttribute
    {      
        public override void OnException(HttpActionExecutedContext context)
        {
            context.Response = context.Request.CreateErrorResponse(ExceptionHelpers.GetHttpStatusCode(context.Exception), context.Exception);
        }
    }
}
