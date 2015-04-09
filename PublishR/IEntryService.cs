using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface IEntryService
    {        
        Task AddEntry(string uri, IDictionary<string, object> properties);
    }
}
