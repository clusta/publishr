using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using PublishR.Abstractions;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.DocumentDB
{
    public class DocumentRepository<T> : DocumentStorage, IRepository<T>, IApproval<T>, IPrivacy
    {       
        private ISession session;
        private ITime time;

        private DocumentResource<T> GetDocumentResource(string id)
        {
            Check.BadRequestIfNull(id);
            
            var resource = GetItem<DocumentResource<T>>(d => d.Id == id);

            Check.NotFoundIfNull(resource);

            return resource;
        }

        private async Task<Resource<T>> UpdateProperty(string id, object value, Action<Resource<T>> merge)
        {
            Check.BadRequestIfNull(value);
            
            var documentResource = GetDocumentResource(id);

            merge(documentResource);

            documentResource.Metadata.Updated = time.Now;

            await UpdateItemAsync(id, documentResource);

            return documentResource.AsResource();
        }

        public Task<Resource<T>[]> List(string kind, string path)
        {
            var documentResources = GetItems<DocumentResource<T>>(d => d.Metadata.Kind == kind && d.Metadata.Path == path);
            var resources = documentResources.Select(d => d.AsResource()).ToArray();

            return Task.FromResult(resources);
        }

        public async Task<Resource<T>> Create(string kind, string path, T content)
        {
            Check.BadRequestIfNull(kind);
            Check.BadRequestIfNull(path);
            Check.BadRequestIfNull(content);
            
            var id = Guid.NewGuid().ToString();
            var now = time.Now;

            var documentResource = new DocumentResource<T>
            {
                Id = id,
                Metadata = new Metadata() 
                {
                    Created = now,
                    Updated = now,
                    Workspace = session.Workspace,
                    Kind = kind,
                    Path = path,
                    State = Known.State.Draft,
                    Privacy = Known.Privacy.Public
                },
                Content = content
            };

            await CreateItemAsync(documentResource);

            return documentResource.AsResource();
        }

        public Task<Resource<T>> Read(string id)
        {
            var documentResource = GetDocumentResource(id);

            Check.NotFoundIfNull(documentResource.Content);

            var resource = documentResource.AsResource();

            return Task.FromResult(resource);
        }

        public Task<Resource<T>> Update(string id, T content)
        {
            return UpdateProperty(id, content, p => p.Content = content);
        }

        public Task Delete(string id)
        {
            return UpdateProperty(id, Known.State.Deleted, p => p.Metadata.State = Known.State.Deleted);
        }

        public Task<Resource<T>> GetApproved(string kind, string path)
        {
            var documentResources = GetItems<DocumentResource<T>>(r => r.Metadata.Kind == kind && r.Metadata.Path == path && r.Metadata.State == Known.State.Approved);

            var resource = documentResources
                .OrderByDescending(r => r.Metadata.Created)
                .Select(r => r.AsResource())
                .FirstOrDefault();

            return Task.FromResult(resource);
        }

        public async Task Submit(string id)
        {
            await UpdateProperty(id, Known.State.Submitted, p => p.Metadata.State = Known.State.Submitted);
        }

        public async Task Approve(string id)
        {
            await UpdateProperty(id, Known.State.Approved, p => p.Metadata.State = Known.State.Approved);
        }

        public async Task Reject(string id)
        {
            await UpdateProperty(id, Known.State.Rejected, p => p.Metadata.State = Known.State.Rejected);
        }

        public async Task Archive(string id)
        {
            await UpdateProperty(id, Known.State.Archived, p => p.Metadata.State = Known.State.Archived);
        }

        public async Task MarkPrivate(string id)
        {
            await UpdateProperty(id, Known.Privacy.Private, p => p.Metadata.Privacy = Known.Privacy.Private);
        }

        public async Task MarkPublic(string id)
        {
            await UpdateProperty(id, Known.Privacy.Public, p => p.Metadata.Privacy = Known.Privacy.Public);
        }       
        
        public DocumentRepository(string collectionId, ISession session, ITime time, ISettings settings) 
            : base(settings, collectionId)
        {
            this.session = session;
            this.time = time;
        }
    }
}