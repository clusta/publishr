using PublishR.Models;
using System.Threading.Tasks;

namespace PublishR.Abstractions
{
    public interface IRepository<T>
    {
        Task<Resource<T>[]> List(string kind, string path);
        Task<Resource<T>> Create(string kind, string path, T content);
        Task<Resource<T>> Read(string id); 
        Task<Resource<T>> Update(string id, T content);        
        Task Delete(string id);        
    }
}
