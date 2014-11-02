using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Organization
    {
        public string Id { get; set; }
        public string Channel { get; set; }
        public string Name { get; set; }
        public IList<Profile> Profiles { get; set; }
        public IList<Contact> Contacts { get; set; }
        public Navigation Navigation { get; set; }
    }
}
