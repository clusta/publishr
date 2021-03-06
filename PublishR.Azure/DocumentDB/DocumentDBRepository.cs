﻿using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using PublishR.Abstractions;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Azure.DocumentDB
{
    public class DocumentDBRepository<T> : DocumentDBProvider, IRepository<T>, IApproval<T>, IPrivacy, IAssociations
    {       
        private ISession session;
        private ITime time;

        private Document<T> GetDocumentResource(string id)
        {
            Check.BadRequestIfNull(id);
            
            var resource = GetItem<Document<T>>(d => d.Id == id);

            Check.NotFoundIfNull(resource);

            return resource;
        }

        private async Task<Resource<T>> UpdateProperty(string id, object value, Action<Document<T>> merge)
        {
            Check.BadRequestIfNull(value);
            
            var documentResource = GetDocumentResource(id);

            merge(documentResource);

            documentResource.Meta.Updated = time.Now;

            await UpdateItemAsync(id, documentResource);

            return documentResource.AsResource();
        }

        public Task<Resource<T>[]> List(string kind, string path)
        {
            var documentResources = GetItems<Document<T>>(d => d.Meta.Kind == kind && d.Meta.Path == path);
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

            var documentResource = new Document<T>
            {
                Id = id,
                Meta = new Meta() 
                {
                    Created = now,
                    Updated = now,
                    Workspace = session.Workspace,
                    Kind = kind,
                    Path = path,
                    State = Known.State.Draft,
                    Privacy = Known.Privacy.Public
                },
                Data = content
            };

            await CreateItemAsync(documentResource);

            return documentResource.AsResource();
        }

        public Task<Resource<T>> Read(string id)
        {
            var documentResource = GetDocumentResource(id);

            Check.NotFoundIfNull(documentResource.Data);

            var resource = documentResource.AsResource();

            return Task.FromResult(resource);
        }

        public Task<Resource<T>> Update(string id, T content)
        {
            return UpdateProperty(id, content, p => p.Data = content);
        }

        public Task Delete(string id)
        {
            return UpdateProperty(id, Known.State.Deleted, p => p.Meta.State = Known.State.Deleted);
        }

        public Task<Resource<T>> GetApproved(string kind, string path)
        {
            var documentResources = GetItems<Document<T>>(r => r.Meta.Kind == kind && r.Meta.Path == path && r.Meta.State == Known.State.Approved);

            var resource = documentResources
                .OrderByDescending(r => r.Meta.Created)
                .Select(r => r.AsResource())
                .FirstOrDefault();

            Check.NotFoundIfNull(resource);

            return Task.FromResult(resource);
        }

        public async Task Submit(string id)
        {
            await UpdateProperty(id, Known.State.Submitted, p => p.Meta.State = Known.State.Submitted);
        }

        public async Task Approve(string id)
        {
            await UpdateProperty(id, Known.State.Approved, p => p.Meta.State = Known.State.Approved);
        }

        public async Task Reject(string id)
        {
            await UpdateProperty(id, Known.State.Rejected, p => p.Meta.State = Known.State.Rejected);
        }

        public async Task Archive(string id)
        {
            await UpdateProperty(id, Known.State.Archived, p => p.Meta.State = Known.State.Archived);
        }

        public async Task MarkPrivate(string id)
        {
            await UpdateProperty(id, Known.Privacy.Private, p => p.Meta.Privacy = Known.Privacy.Private);
        }

        public async Task MarkPublic(string id)
        {
            await UpdateProperty(id, Known.Privacy.Public, p => p.Meta.Privacy = Known.Privacy.Public);
        }       

        public Task<Result> ListAssociation(string id, string associationName)
        {
            var queryText = string.Format("SELECT VALUE p.associations.{0} FROM p WHERE p.id = @id", associationName);
            var sqlQuery = new SqlQuerySpec()
            {
                QueryText = queryText,
                Parameters = new SqlParameterCollection()
                {
                    new SqlParameter("@id", id)
                }
            };

            var associations = GetItems<string[]>(sqlQuery).FirstOrDefault();
            var associationsList = "(\"" + string.Join("\",\"", associations) + "\")";
            var associationQueryText = string.Format("SELECT p.id AS id, p.meta.kind AS kind, p.meta.created AS created, p.meta.updated AS updated, p.data.cards AS cards FROM p WHERE p.id IN {0}", associationsList);
            var listings = GetItems<Listing>(associationQueryText).ToList();

            var result = new Result()
            {
                Data = listings
            };

            return Task.FromResult(result);
        }

        public async Task UpdateAssociation(string id, string associationName, string[] items)
        {
            await UpdateProperty(id, items, p =>
            {
                p.Associations[associationName] = items;
            });
        }

        public async Task AppendAssociation(string id, string associationName, string[] items)
        {
            await UpdateProperty(id, items, p =>
            {
                var associations = p.Associations[associationName] ?? new string[] { };

                p.Associations[associationName] = associations
                    .Concat(items)
                    .Distinct()
                    .Where(s => !string.IsNullOrWhiteSpace(s))
                    .ToArray();
            });
        }    
        
        public DocumentDBRepository(string collectionId, ISession session, ITime time, ISettings settings) 
            : base(settings, collectionId)
        {
            this.session = session;
            this.time = time;
        }
    }
}