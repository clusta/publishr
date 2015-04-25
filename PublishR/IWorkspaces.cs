using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface IWorkspaces
    {
        Task<Workspace> GetWorkspace(string id);
        Task<string> CreateWorkspace(string kind, string slug, Card card);
        Task UpdateCards(string id, IDictionary<string, Card> cards);
        Task UpdateProperties(string id, IDictionary<string, object> properties);
    }
}
