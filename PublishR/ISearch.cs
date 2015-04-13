using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface ISearch
    {
        Task<IList<Listing>> Suggestions(string term);
        Task<Collection> SearchByUri(string[] uris);
        Task<Collection> SearchByTag(string[] tags);
        Task<Collection> SearchByKind(string kind); 
    }
}
