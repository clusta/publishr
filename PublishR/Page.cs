using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Page
    {
        public string Title { get; set; }
        public string Self { get; set; }
        public IList<Card> Cards { get; set; }
        public IList<Profile> Profiles { get; set; }
        public IList<Section> Sections { get; set; }
        public IList<Tag> Tags { get; set; }
        public IDictionary<string, Feed> Feeds { get; set; }
        public Metadata Metadata { get; set; }
        public Features Features { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
