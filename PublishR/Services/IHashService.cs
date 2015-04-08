using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Services
{
    public interface IHashService
    {
        string HashString(string input);
        bool ValidateHashString(string hashed, string provided);
    }
}
