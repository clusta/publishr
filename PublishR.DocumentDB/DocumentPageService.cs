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
    public class DocumentPageService : DocumentService, IPageService
    {
        private ISession session;
        private ITime time;

        private DocumentResource<Page> Get(string id)
        {
            return GetItem<DocumentResource<Page>>(d => d.Id == id);
        }

        private async Task UpdateProperty(string id, Action<DocumentResource<Page>> merge)
        {
            var resource = Get(id);

            merge(resource);

            resource.Data.Updated = time.Now;

            await UpdateItemAsync(id, resource);
        }

        public Task<Page> GetPage(string id)
        {
            var page = Get(id);          
            
            return Task.FromResult(page.Data);
        }

        public async Task<string> AddPage(string kind, string slug, Cover cover)
        {            
            var id = string.Join("|", session.Workspace, kind, slug);
            var now = time.Now;

            var resource = new DocumentResource<Page>
            {
                Id = id,
                State = Known.State.Draft,
                Workspace = session.Workspace,
                Data = new Page()
                {
                    Kind = kind,
                    Created = now,
                    Updated = now,
                    Cover = cover
                }
            };

            await CreateItemAsync(resource);

            return resource.Id;
        }

        public async Task UpdateCover(string id, Cover cover)
        {
            await UpdateProperty(id, p => p.Data.Cover = cover);
        }

        public async Task UpdateProperties(string id, IDictionary<string, object> properties)
        {
            await UpdateProperty(id, p => p.Data.Properties = properties);
        }

        public async Task UpdateTags(string id, string[] tags)
        {
            await UpdateProperty(id, p => p.Data.Tags = tags);
        }

        public async Task UpdateMetadata(string id, Metadata metadata)
        {
            await UpdateProperty(id, p => p.Data.Metadata = metadata);
        }

        public async Task UpdateSections(string id, IList<Section> sections)
        {
            await UpdateProperty(id, p => p.Data.Sections = sections);
        }

        public async Task UpdateCredits(string id, IList<Credit> credits)
        {
            await UpdateProperty(id, p => p.Data.Credits = credits);
        }

        public async Task UpdateCards(string id, IDictionary<string, Card> cards)
        {
            await UpdateProperty(id, p => p.Data.Cards = cards);
        }

        public async Task UpdateSchedule(string id, Schedule schedule)
        {
            await UpdateProperty(id, p => p.Data.Schedule = schedule);
        }

        public async Task SubmitPage(string id)
        {
            await UpdateProperty(id, p => p.State = Known.State.Submitted);
        }

        public async Task ApprovePage(string id)
        {
            await UpdateProperty(id, p => p.State = Known.State.Approved);
        }

        public async Task RejectPage(string id)
        {
            await UpdateProperty(id, p => p.State = Known.State.Rejected);
        }

        public async Task ArchivePage(string id)
        {
            await UpdateProperty(id, p => p.State = Known.State.Archived);
        }

        public async Task DeletePage(string id)
        {
            await UpdateProperty(id, p => p.State = Known.State.Deleted);
        }
       
        public DocumentPageService(ISession session, ITime time, ISettings settings) 
            : base(settings, "publishr.pages")
        {
            this.session = session;
            this.time = time;
        }
    }
}