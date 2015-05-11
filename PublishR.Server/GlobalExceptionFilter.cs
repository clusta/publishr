using PublishR.Exceptions;
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
            if (context.Exception is ArgumentException)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            else if (context.Exception is NotFoundException)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.NotFound);
            }
            else if (context.Exception is UnauthorizedAccessException)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }
            else if (context.Exception is ForbiddenException)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.Forbidden);
            }
            else if (context.Exception is DuplicateException)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.Conflict);
            }
            else
            {
                context.Response = context.Request.CreateErrorResponse(HttpStatusCode.InternalServerError, context.Exception);
            }
        }
    }
}
