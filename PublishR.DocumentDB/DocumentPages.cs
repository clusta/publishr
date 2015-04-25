﻿using Microsoft.Azure.Documents;
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
            Check.BadRequestIfNull(id);
            
            var resource = GetItem<DocumentResource<Page>>(d => d.Id == id);

            Check.NotFoundIfNull(resource);

            return resource;
        }

        private Task UpdateProperty(string id, object value, Action<DocumentResource<Page>> merge)
        {
            Check.BadRequestIfNull(value);
            
            var resource = Get(id);

            merge(resource);

            resource.Data.Updated = time.Now;

            return UpdateItemAsync(id, resource);
        }

        public Task<Page> GetPage(string id)
        {
            var page = Get(id);

            Check.NotFoundIfNull(page.Data);

            return Task.FromResult(page.Data);
        }

        public async Task<string> CreatePage(string kind, string slug, Card card)
        {
            Check.BadRequestIfNull(kind);
            Check.BadRequestIfNull(slug);
            Check.BadRequestIfNull(card);
            Check.BadRequestIfNull(card.Title);
            
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
                    Cards = new Dictionary<string, Card>()
                    {
                        { 
                            Known.Card.Medium,
                            card
                        }
                    }
                }
            };

            await CreateItemAsync(resource);

            return resource.Id;
        }

        public Task UpdateCards(string id, IDictionary<string, Card> cards)
        {
            return UpdateProperty(id, cards, p => p.Data.Cards = cards);
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

        public Task UpdateSchedules(string id, IList<Schedule> schedules)
        {
            return UpdateProperty(id, schedules, p => p.Data.Schedules = schedules);
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