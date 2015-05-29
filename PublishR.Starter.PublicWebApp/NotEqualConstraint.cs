using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;

namespace PublishR.Starter.PublicWebApp
{
    public class NotEqualConstraint : IRouteConstraint
    {
        private readonly string[] matches;

        public NotEqualConstraint(string matches)
        {
            this.matches = matches.Split('|');
        }

        public bool Match(HttpContextBase httpContext, Route route, string parameterName, RouteValueDictionary values, RouteDirection routeDirection)
        {
            var value = values[parameterName].ToString();
            
            return matches.All(m => String.Compare(value, m, true) != 0);
        }
    }
}