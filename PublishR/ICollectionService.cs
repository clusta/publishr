using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface ICollectionService
    {
        Task<Collection> GetCollection(string id);        
        Task<string> AddCollection(string kind, string slug, Cover cover);        
        Task UpdateCover(string id, Cover cover);
        Task UpdateProperties(string id, IDictionary<string, object> properties);
        Task AppendListings(string id, string[] uris);
        Task UpdateListings(string id, string[] uris);                
        Task ApproveCollection(string id);
        Task ArchiveCollection(string id);
        Task DeleteCollection(string id);
    }
}
