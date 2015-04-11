using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface IPageService
    {
        Task<Page> GetPage(string id);
        Task<string> AddPage(string kind, string slug, Cover cover);
        Task UpdateCover(string id, Cover cover);
        Task UpdateProperties(string id, IDictionary<string, object> properties);
        Task UpdateTags(string id, string[] tags);
        Task UpdateMetadata(string id, Metadata metadata);
        Task UpdateSections(string id, IList<Section> sections);
        Task UpdateCredits(string id, IList<Credit> credits);
        Task UpdateCards(string id, IDictionary<string, Card> cards);
        Task UpdateSchedule(string id, Schedule schedule);
        Task SubmitPage(string id);
        Task ApprovePage(string id);
        Task RejectPage(string id);
        Task ArchivePage(string id);
        Task DeletePage(string id);
    }
}
