using Microsoft.Azure.Documents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.DocumentDB
{
    public class DocumentCollections : DocumentStore, ICollections
    {
        private ISession session;
        private ITime time;

        private const string listingsKey = "listings";

        private DocumentResource<Collection> Get(string id)
        {
            return GetItem<DocumentResource<Collection>>(d => d.Id == id);
        }

        private Task UpdateProperty(string id, object value, Action<DocumentResource<Collection>> merge)
        {
            Check.BadRequestIfNull(id);
            Check.BadRequestIfNull(value);
            
            var resource = Get(id);

            Check.NotFoundIfNull(resource);

            merge(resource);

            resource.Data.Updated = time.Now;

            return UpdateItemAsync(id, resource);
        }

        private DocumentCollection pageCollection;

        private DocumentCollection PageCollection
        {
            get
            {
                if (pageCollection == null)
                {
                    pageCollection = GetDocumentCollection(DocumentPages.PageCollectionId);
                }

                return pageCollection;
            }
        }

        // http://azure.microsoft.com/en-gb/documentation/articles/documentdb-limits/
        private const int MaximumOrClauses = 5;

        public Task<Collection> GetCollection(string id)
        {
            var resource = Get(id);
            var collection = resource.Data;
            var listingIds = resource.Associations[listingsKey];

            if (collection.Listings == null || collection.Listings.Count == 0)
            {
                collection.Listings = new List<Listing>();
                
                foreach (var pageSet in listingIds.Chunk(MaximumOrClauses))
                {
                    var condition = string.Join(" OR ", pageSet.Select(p => string.Format("c.id = '{0}'", p)));
                    var listings = GetItems<Listing>("SELECT c.id as id, c.data.cards as cards FROM c WHERE " + condition, PageCollection.DocumentsLink);

                    var orderedListings = listings
                        .OrderBy(l => listingIds.ToList().IndexOf(l.Uri))
                        .ToList();

                    collection.Listings
                        .AddRange(orderedListings);
                }
            }

            return Task.FromResult(collection);
        }

        public async Task<string> CreateCollection(string kind, string slug, Cover cover)
        {
            Check.BadRequestIfNull(kind);
            Check.BadRequestIfNull(slug);
            Check.BadRequestIfNull(cover);            
            
            var id = BuildDocumentId(session.Workspace, kind, slug);
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

        public Task UpdateCover(string id, Cover cover)
        {
            return UpdateProperty(id, cover, c => c.Data.Cover = cover);
        }

        public Task UpdateProperties(string id, IDictionary<string, object> properties)
        {
            return UpdateProperty(id, properties, c => c.Data.Properties = properties);
        }

        public Task AppendListings(string id, string[] listings)
        {
            return UpdateProperty(id, listings, c => c.Associations[listingsKey] = c.Associations[listingsKey].Concat(listings).Distinct().ToArray());
        }

        public Task UpdateListings(string id, string[] uris)
        {
            return UpdateProperty(id, uris, c => c.Associations[listingsKey] = uris.Distinct().ToArray());
        }

        public Task ApproveCollection(string id)
        {
            return UpdateProperty(id, Known.State.Approved, p => p.State = Known.State.Approved);
        }

        public Task ArchiveCollection(string id)
        {
            return UpdateProperty(id, Known.State.Archived, p => p.State = Known.State.Archived);
        }

        public Task DeleteCollection(string id)
        {
            return UpdateProperty(id, Known.State.Deleted, p => p.State = Known.State.Deleted);
        }

        public DocumentCollections(ISession session, ITime time, ISettings settings) 
            : base(settings, "publishr.collections")
        {
            this.session = session;
            this.time = time;
        }
    }
}
