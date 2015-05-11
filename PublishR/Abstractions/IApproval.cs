using PublishR.Models;
using System.Threading.Tasks;

namespace PublishR.Abstractions
{
    public interface IApproval<T>
    {
        Task<Resource<T>> GetApproved(string kind, string path);
        Task Submit(string id);
        Task Approve(string id);
        Task Reject(string id);
        Task Archive(string id);
    }
}
