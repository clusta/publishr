using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Feature
    {
        public bool Enabled { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
