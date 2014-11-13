using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Template
    {
        public string Id { get; set; }
        public string Channel { get; set; }
       
        public string Name { get; set; } 
        
        public Metadata Metadata { get; set; }

        public Theme Theme { get; set; }

        public IList<Section> Sections { get; set; }       
        public IList<Link> Links { get; set; }

        public IDictionary<string, Card> Cards { get; set; }
        public IDictionary<string, Feed> Feeds { get; set; }
        public IDictionary<string, Feature> Features { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
