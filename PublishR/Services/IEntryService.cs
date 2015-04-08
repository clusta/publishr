using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Services
{
    public interface IEntryService
    {        
        Task AddEntry(string uri, string uid, IDictionary<string, object> properties);
    }
}
