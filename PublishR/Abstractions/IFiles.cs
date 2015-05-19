using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Abstractions
{ 
    public interface IFiles
    {                         
        Task<IDictionary<string, IDictionary<string, Endpoint>>> Create(string set, IDictionary<string, File> files);
        Task<Endpoint> Update(string uri, File file);
    }
}
