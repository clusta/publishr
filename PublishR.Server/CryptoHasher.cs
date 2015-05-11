using PublishR.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Helpers;

namespace PublishR.Server
{
    public class CryptoHasher : IHasher
    {
        public string HashString(string input)
        {
            return Crypto.HashPassword(input);
        }

        public bool ValidateHashString(string hashed, string provided)
        {
            return Crypto.VerifyHashedPassword(hashed, provided);
        }
    }
}
