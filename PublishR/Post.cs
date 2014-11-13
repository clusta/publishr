using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Post
    {
        public string Id { get; set; }

        public string Channel { get; set; }

        public State State { get; set; }
        public bool Deleted { get; set; }
        public bool Public { get; set; }      
  
        public DateTime Created { get; set; }
        
        public string Uri { get; set; }
        public string Provider { get; set; }

        public IDictionary<string, Card> Cards { get; set; }
        public IDictionary<string, object> Properties { get; set; }
    }
}
