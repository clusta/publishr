using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Article
    {
        public string Id { get; set; }
        public string Channel { get; set; }
        public string Kind { get; set; }
        public State State { get; set; }
        public string Slug { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool Deleted { get; set; }
        public IList<Card> Cards { get; set; }
        public IList<Profile> Profiles { get; set; }
        public IList<Section> Sections { get; set; }
        public IList<Tag> Tags { get; set; }
        public Publish Publish { get; set; }
        public Navigation Navigation { get; set; }
        public Metadata Metadata { get; set; }
        public IDictionary<string, Feature> Features { get; set; }
        public IList<Contact> Contacts { get; set; }
        public IList<Schedule> Schedule { get; set; }
        public IList<Price> Prices { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
