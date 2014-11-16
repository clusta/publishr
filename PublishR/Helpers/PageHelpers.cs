using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Helpers
{
    public static class PageHelpers
    {
        public static bool IsEnabled(this Page page, string feature)
        {
            return page.Features != null && 
                page.Features.ContainsKey(feature) && 
                page.Features[feature].IsEnabled;
        }

        public static bool HasProperty(this Page page, string property)
        {
            return page.Properties != null && 
                page.Properties.ContainsKey(property) && 
                page.Properties[property] != null;
        }
    }
}
