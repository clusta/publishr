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
        public IList<Card> Cards { get; set; }
        public Metadata Metadata { get; set; }
        public IDictionary<string, Feature> Features { get; set; }
        public Theme Theme { get; set; }
        public IList<Credential> Credentials { get; set; }
        public bool Public { get; set; }
        public bool Secure { get; set; }
        public IDictionary<string, object> Properties { get; set; }

        public UriBuilder CreateUriBuilder(string path = null)
        {
            var scheme = Secure ? "https" : "http";
            var uriBuilder = new UriBuilder(scheme, Hostname);

            uriBuilder.Path = path;

            return uriBuilder;
        }
    }
}
