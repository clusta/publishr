using PublishR.Models;
using System.Threading.Tasks;

namespace PublishR.Abstractions
{
    public interface IVersioning
    {
        Task<Change[]> GetChanges(string kind, string path);
        Task Rollback(string id);
    }
}
