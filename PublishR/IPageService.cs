using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface IPageService
    {
        Task<Page> GetPage(string uri);
        Task<string> AddPage(string slug, string kind, Cover cover);
        Task UpdateCover(string uri, Cover cover);
        Task UpdateProperties(string uri, IDictionary<string, object> properties);
        Task UpdateTags(string uri, string[] tags);
        Task UpdateMetadata(string uri, Metadata metadata);
        Task UpdateSections(string uri, IList<Section> sections);
        Task UpdateCredits(string uri, IList<Credit> credits);
        Task UpdateCards(string uri, IDictionary<string, Card> cards);
        Task PublishPage(string uri);
        Task ApprovePage(string uri);
        Task RejectPage(string uri);
        Task ArchivePage(string uri);
        Task DeletePage(string uri);
        Task SchedulePage(string uri, Schedule schedule);
    }
}
