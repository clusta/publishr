using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PublishR
{
    public class Channel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public Member[] Members { get; set; }
        public Site[] Sites { get; set; }
    }
}
