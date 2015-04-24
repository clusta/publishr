using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface IWorkspaces
    {
        Task<string> CreateWorkspace(string kind, string slug, Cover cover);
        Task UpdateCover(string id, Cover cover);
        Task UpdateProperties(string id, IDictionary<string, object> properties);
    }
}
