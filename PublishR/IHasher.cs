using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface IHasher
    {
        string HashString(string input);
        bool ValidateHashString(string hashed, string provided);
    }
}
