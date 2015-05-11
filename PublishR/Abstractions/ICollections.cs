using PublishR.Models;
using System.Threading.Tasks;

namespace PublishR.Abstractions
{
    public interface ICollections
    {
        Task<Collection> GetCollection(string id, string collectionName);
        Task UpdateListings(string id, string collectionName, string[] listings);
        Task AppendListings(string id, string collectionName, string[] listings);
    }
}
