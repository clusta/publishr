using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.DocumentDB
{
    public class DocumentPages : DocumentStore, IPages
    {
        public const string PageCollectionId = "publishr.pages";
        
        private ISession session;
        private ITime time;

        private DocumentResource<Page> Get(string id)
        {
            return GetItem<DocumentResource<Page>>(d => d.Id == id);
        }

        private Task UpdateProperty(string id, object value, Action<DocumentResource<Page>> merge)
        {
            Check.BadRequestIfNull(id);
            Check.BadRequestIfNull(value);
            
            var resource = Get(id);

            Check.NotFoundIfNull(resource);

            merge(resource);

            resource.Data.Updated = time.Now;

            return UpdateItemAsync(id, resource);
        }

        public Task<Page> GetPage(string id)
        {
            var page = Get(id);

            Check.NotFoundIfNull(page);
            Check.NotFoundIfNull(page.Data);

            return Task.FromResult(page.Data);
        }

        public async Task<string> AddPage(string kind, string slug, Cover cover)
        {
            Check.BadRequestIfNull(kind);
            Check.BadRequestIfNull(slug);
            Check.BadRequestIfNull(cover);
            
            var id = BuildDocumentId(session.Workspace, kind, slug);
            var now = time.Now;

            var resource = new DocumentResource<Page>
            {
                Id = id,
                Workspace = session.Workspace,
                State = Known.State.Draft,
                Data = new Page()
                {
                    Kind = kind,
                    Created = now,
                    Updated = now,
                    Cover = cover,
                    Cards = new Dictionary<string, Card>()
                    {
                        { 
                            Known.Card.Small,
                            new Card() 
                            {
                                Title = cover.Title
                            }
                        }
                    }
                }
            };

            await CreateItemAsync(resource);

            return resource.Id;
        }

        public Task UpdateCover(string id, Cover cover)
        {
            return UpdateProperty(id, cover, p => p.Data.Cover = cover);
        }

        public Task UpdateProperties(string id, IDictionary<string, object> properties)
        {
            return UpdateProperty(id, properties, p => p.Data.Properties = properties);
        }

        public Task UpdateTags(string id, string[] tags)
        {
            return UpdateProperty(id, tags, p => p.Data.Tags = tags);
        }

        public Task UpdateMetadata(string id, Metadata metadata)
        {
            return UpdateProperty(id, metadata, p => p.Data.Metadata = metadata);
        }

        public Task UpdateSections(string id, IList<Section> sections)
        {
            return UpdateProperty(id, sections, p => p.Data.Sections = sections);
        }

        public Task UpdateCredits(string id, IList<Credit> credits)
        {
            return UpdateProperty(id, credits, p => p.Data.Credits = credits);
        }

        public Task UpdateCards(string id, IDictionary<string, Card> cards)
        {
            return UpdateProperty(id, cards, p => p.Data.Cards = cards);
        }

        public Task UpdateSchedule(string id, Schedule schedule)
        {
            return UpdateProperty(id, schedule, p => p.Data.Schedule = schedule);
        }

        public Task SubmitPage(string id)
        {
            return UpdateProperty(id, Known.State.Submitted, p => p.State = Known.State.Submitted);
        }

        public Task ApprovePage(string id)
        {
            return UpdateProperty(id, Known.State.Approved, p => p.State = Known.State.Approved);
        }

        public Task RejectPage(string id)
        {
            return UpdateProperty(id, Known.State.Rejected, p => p.State = Known.State.Rejected);
        }

        public Task ArchivePage(string id)
        {
            return UpdateProperty(id, Known.State.Archived, p => p.State = Known.State.Archived);
        }

        public Task DeletePage(string id)
        {
            return UpdateProperty(id, Known.State.Deleted, p => p.State = Known.State.Deleted);
        }
       
        public DocumentPages(ISession session, ITime time, ISettings settings) 
            : base(settings, PageCollectionId)
        {
            this.session = session;
            this.time = time;
        }
    }
}