using PublishR.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PublishR.Abstractions
{
    public interface ISearch
    {
        Task<IList<Facet>> GetFacets(string kind);
        Task<Result> Search(string kind, IDictionary<string, object> facets, string continuation);
    }
}