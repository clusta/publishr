using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Price
    {
        public double Retail { get; set; }
        public string Currency { get; set; }
        public int Quantity { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
