using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface IIdentityService
    {
        string Uid { get; }
        string Role { get; }
    }
}
