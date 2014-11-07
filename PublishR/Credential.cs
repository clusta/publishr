using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public class Credential
    {
        public string Provider { get; set; }
        public string Container { get; set; }
        public Token Account { get; set; }
        public Token Access { get; set; }
    }
}
