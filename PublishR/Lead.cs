using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Lead
    {
        public string Id { get; set; }
        public DateTime Created { get; set; }
        public IList<Contact> Contacts { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
