using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PublishR
{
    public class Channel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public IList<Member> Members { get; set; }
        public IList<Environment> Environments { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
