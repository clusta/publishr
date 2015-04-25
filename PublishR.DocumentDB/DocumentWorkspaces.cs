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
    public class DocumentWorkspaces : DocumentStore, IWorkspaces
    {      
        private ISession session;
        private ITime time;

        private DocumentResource<Workspace> Get(string id)
        {
            Check.BadRequestIfNull(id);
            
            var resource = GetItem<DocumentResource<Workspace>>(d => d.Id == id);

            Check.NotFoundIfNull(resource);

            return resource;
        }

        private Task UpdateProperty(string id, object value, Action<DocumentResource<Workspace>> merge)
        {
            Check.BadRequestIfNull(value);

            var resource = Get(id);

            merge(resource);

            resource.Data.Updated = time.Now;

            return UpdateItemAsync(id, resource);
        }

        public Task<Workspace> GetWorkspace(string id)
        {
            var workspace = Get(id);

            Check.NotFoundIfNull(workspace.Data);

            return Task.FromResult(workspace.Data);
        }

        public async Task<string> CreateWorkspace(string kind, string slug, Card card)
        {
            Check.BadRequestIfNull(kind);
            Check.BadRequestIfNull(slug);
            Check.BadRequestIfNull(card);
            Check.BadRequestIfNull(card.Title);
            
            var id = slug;
            var now = time.Now;

            var resource = new DocumentResource<Workspace>()
            {
                Id = id,
                Workspace = id,
                State = Known.State.Approved,
                Data = new Workspace()
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
            return UpdateProperty(id, properties, c => c.Data.Properties = properties);
        }

        public DocumentWorkspaces(ISession session, ITime time, ISettings settings) 
            : base(settings, "publishr.workspaces")
        {
            this.session = session;
            this.time = time;
        }
    }
}