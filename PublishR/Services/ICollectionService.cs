using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Services
{
    public interface ICollectionService
    {
        Task<Collection> GetCollection(string uri);        
        Task<string> AddCollection(string slug, Cover cover);        
        Task UpdateCover(string uri, Cover cover);
        Task UpdateProperties(string uri, IDictionary<string, object> properties);
        Task AppendResources(string uri, string[] resources);
        Task UpdateResources(string uri, string[] resources);                
        Task PublishCollection(string uri);
        Task ArchiveCollection(string uri);
        Task DeleteCollection(string uri);
    }
}
