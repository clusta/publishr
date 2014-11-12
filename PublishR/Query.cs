using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Query
    {
        public int Skip { get; set; }
        public int Take { get; set; }
        public string Kind { get; set; }
        public string Sort { get; set; }
        public string Filter { get; set; }
        public IDictionary<string, object> Parameters { get; set; }
    }
}
