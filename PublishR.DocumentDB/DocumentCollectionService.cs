using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.DocumentDB
{
    public class DocumentCollectionService : DocumentService, ICollectionService
    {
        private ISession session;
        private ITime time;

        private const string listingsKey = "listings";

        private DocumentResource<Collection> Get(string id)
        {
            return GetItem<DocumentResource<Collection>>(d => d.Id == id);
        }

        private async Task UpdateProperty(string id, Action<DocumentResource<Collection>> merge)
        {
            var resource = Get(id);

            merge(resource);

            resource.Data.Updated = time.Now;

            await UpdateItemAsync(id, resource);
        }

        public Task<Collection> GetCollection(string id)
        {
            var resource = Get(id);

            // todo: iterate listings

            return Task.FromResult(resource.Data);
        }

        public async Task<string> AddCollection(string kind, string slug, Cover cover)
        {
            var id = string.Join("|", session.Workspace, kind, slug);
            var now = time.Now;

            var resource = new DocumentResource<Collection>
            {
                Id = id,
                State = Known.State.Draft,
                Workspace = session.Workspace,
                Data = new Collection()
                {
                    Kind = kind,
                    Created = now,
                    Updated = now,
                    Cover = cover
                },
                Associations = new Dictionary<string, string[]>()
                {
                    { listingsKey, new string[] {} }
                }
            };

            await CreateItemAsync(resource);

            return resource.Id;
        }

        public async Task UpdateCover(string id, Cover cover)
        {
            await UpdateProperty(id, c => c.Data.Cover = cover);
        }

        public async Task UpdateProperties(string id, IDictionary<string, object> properties)
        {
            await UpdateProperty(id, c => c.Data.Properties = properties);
        }

        public async Task AppendListings(string id, string[] uris)
        {
            await UpdateProperty(id, c => c.Associations[listingsKey] = c.Associations[listingsKey].Concat(uris).Distinct().ToArray());
        }

        public async Task UpdateListings(string id, string[] uris)
        {
            await UpdateProperty(id, c => c.Associations[listingsKey] = uris.Distinct().ToArray());
        }

        public async Task ApproveCollection(string id)
        {
            await UpdateProperty(id, p => p.State = Known.State.Approved);
        }

        public async Task ArchiveCollection(string id)
        {
            await UpdateProperty(id, p => p.State = Known.State.Archived);
        }

        public async Task DeleteCollection(string id)
        {
            await UpdateProperty(id, p => p.State = Known.State.Deleted);
        }

        public DocumentCollectionService(ISession session, ITime time, ISettings settings) 
            : base(settings, "publishr.collections")
        {
            this.session = session;
            this.time = time;
        }
    }
}
