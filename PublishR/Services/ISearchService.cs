using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Services
{
    public interface ISearchService
    {
        Task<Card[]> SearchByUri(string[] uris, string cardType);
        Task<Card[]> SearchByTag(string tag, string cardType);
        Task<Card[]> SearchByKind(string kind, string cardType); 
    }
}
