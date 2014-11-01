using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Person
    {
        public string Id { get; set; }
        public string Channel { get; set; }
        public Name Name { get; set; }
        public Profile[] Profiles { get; set; }
        public Contact[] Contacts { get; set; }
        public DateTime? Birthday { get; set; }
        public DateTime Created { get; set; }
    }
}
