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
        public string Caption { get; set; }
        public string Credit { get; set; }
        public IList<Source> Sources { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
