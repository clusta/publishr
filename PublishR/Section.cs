using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Section
    {
        public string Kind { get; set; }
        public string Region { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public IList<Action> Actions { get; set; }
        public IList<Media> Media { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
