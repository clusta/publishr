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
        IDictionary<string, IDictionary<string, Endpoint>> CreateFiles(string set, IDictionary<string, File> files);
        Endpoint UpdateFile(string uri, File file);
    }
}
