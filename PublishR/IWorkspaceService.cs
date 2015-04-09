using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface IWorkspaceService
    {
        Task<string> AddWorkspace(string slug, string name);
        Task UpdateProperties(string uri, IDictionary<string, object> properties);
    }
}
