using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Environment
    {
        public string Name { get; set; }
        public string Alias { get; set; }
        public string Hostname { get; set; }
        public string Template { get; set; }
        public IList<Credential> Credentials { get; set; }
        public bool Public { get; set; }
        public bool Secure { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
