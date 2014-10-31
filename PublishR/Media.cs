using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Media
    {
        public string Kind { get; set; }
        public string Uri { get; set; }
        public string Source { get; set; }
        public string Caption { get; set; }
        public string Credit { get; set; }
        public string Ratio { get; set; }
        public string Orientation { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
