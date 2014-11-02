using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Site
    {
        public string Name { get; set; }
        public string Alias { get; set; }
        public Environment Environment { get; set; }
        public string Hostname { get; set; }
        public Metadata Metadata { get; set; }
        public Features Features { get; set; }
        public Theme Theme { get; set; }
        public IList<Credential> Credentials { get; set; }
        public IList<Tag> Tags { get; set; }
        public bool Public { get; set; }
    }
}
