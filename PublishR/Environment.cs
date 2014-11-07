using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Environment
    {
        public string Kind { get; set; }
        public string Name { get; set; }
        public string Alias { get; set; }
        public string Hostname { get; set; }
        public Metadata Metadata { get; set; }
        public IDictionary<string, Feature> Features { get; set; }
        public Theme Theme { get; set; }
        public IList<Credential> Credentials { get; set; }
        public string[] Tags { get; set; }
        public bool Public { get; set; }
    }
}
