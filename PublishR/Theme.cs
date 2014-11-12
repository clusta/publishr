using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Theme
    {
        public string Logo { get; set; }
        public string Cover { get; set; }
        public string Background { get; set; }
        public string Stylesheet { get; set; }
        public string Embed { get; set; }
        public string Color { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
