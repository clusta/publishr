using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Page
    {
        public Site Site { get; set; }
        public Article Article { get; set; }
        public IDictionary<string, Feed> Feeds { get; set; }
    }
}
