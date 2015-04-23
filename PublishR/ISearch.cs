using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface ISearch
    {
        Task<IList<Facet>> GetFacets();
        Task<Collection> Query(IDictionary<string, object> facets); 
    }
}