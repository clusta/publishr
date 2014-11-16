using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Page
    {
        public string Self { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        
        public string[] Tags { get; set; }

        public Metadata Metadata { get; set; }
        public Metrics Metrics { get; set; }

        public Theme Theme { get; set; }

        public IList<Profile> Profiles { get; set; }
        public IList<Section> Sections { get; set; }
        public IList<Contact> Contacts { get; set; }
        public IList<Event> Events { get; set; }
        public IList<Price> Prices { get; set; }
        public IList<Link> Links { get; set; }

        public IDictionary<string, Card> Cards { get; set; }
        public IDictionary<string, Feed> Feeds { get; set; }
        public IDictionary<string, Feature> Features { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
