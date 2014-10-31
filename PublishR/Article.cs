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
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool Deleted { get; set; }
        public IList<Card> Cards { get; set; }
        public IList<Profile> Credits { get; set; }
        public IList<Section> Sections { get; set; }
        public IList<Tag> Tags { get; set; }
        public Schedule Schedule { get; set; }
        public Navigation Navigation { get; set; }
    }
}
