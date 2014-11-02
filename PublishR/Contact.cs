using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Contact
    {
        public string Kind { get; set; }
        public Person Person { get; set; }
        public string Company { get; set; }
        public string Position { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public Address Address { get; set; }
        public Point Point { get; set; }
    }
}
