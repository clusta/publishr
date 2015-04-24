using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Server
{
    public class SystemTime : ITime
    {
        public DateTime Now
        {
            get 
            {
                return DateTime.UtcNow;
            }
        }
    }
}
