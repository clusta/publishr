using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Feed
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Query Query { get; set; }
        public IDictionary<string, object> Properties { get; set; }
        public Data Data { get; set; }
    }
}
