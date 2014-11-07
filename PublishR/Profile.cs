using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Profile
    {
        public string Provider { get; set; }
        public string Uri { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public string Alias { get; set; }
        public string Role { get; set; }
        public bool Public { get; set; }
    }
}
