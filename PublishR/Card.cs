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
        public DateTime Timestamp { get; set; }
        public IList<Media> Media { get; set; }
        public IList<Profile> Profiles { get; set; }
        public string[] Tags { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
