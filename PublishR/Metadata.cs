using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Metadata
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Keywords { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
