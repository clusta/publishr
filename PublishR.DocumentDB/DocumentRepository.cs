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
    public class DocumentRepository<T> : DocumentStorage, IRepository<T>
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
                    Kind = kind,
                    Path = path,
                    State = Known.State.Draft
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
       
        public DocumentRepository(ISession session, ITime time, ISettings settings) 
            : base(settings, Known.Collections.Pages)
        {
            this.session = session;
            this.time = time;
        }
    }
}