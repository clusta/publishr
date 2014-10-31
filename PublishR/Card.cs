using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Card
    {
        public string Kind { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public IList<Media> Media { get; set; }
        public IDictionary<string, object> Properties { get; set; }
        public DateTime Timestamp { get; set; }
        public Profile Author { get; set; }
        public IList<Tag> Tags { get; set; }
    }
}
