using PublishR.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Helpers
{
    public static class ExceptionHelpers
    {
        private static Dictionary<Type, HttpStatusCode> mappings = new Dictionary<Type, HttpStatusCode>()
        {
            { typeof(ArgumentException), HttpStatusCode.BadRequest },
            { typeof(NotFoundException), HttpStatusCode.NotFound },
            { typeof(UnauthorizedAccessException), HttpStatusCode.Unauthorized },
            { typeof(ForbiddenException), HttpStatusCode.Forbidden },
            { typeof(DuplicateException), HttpStatusCode.Conflict }
        };

        public static HttpStatusCode GetHttpStatusCode(Exception exception) 
        {
            HttpStatusCode httpStatusCode;
            
            if (mappings.TryGetValue(exception.GetType(), out httpStatusCode))
            {
                return httpStatusCode;
            }
            else
            {
                return HttpStatusCode.InternalServerError;
            }
        }
    }
}
