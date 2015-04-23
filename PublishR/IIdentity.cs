using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface IIdentity
    {
        string Uid { get; }
        string[] Roles { get; }
    }
}
