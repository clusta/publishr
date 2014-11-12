using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Data
    {
        public IList Items { get; set; }
        public Continuation Continuation { get; set; }
        public int? Total { get; set; }
    }
}
