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
        public IList<Card> Cards { get; set; }
        public Paging Paging { get; set; }
        public string Next { get; set; }
        public string Previous { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
