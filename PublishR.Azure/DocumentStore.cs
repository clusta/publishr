using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Azure
{
    public class DocumentStore<T> : IDocumentStore<T>, IDisposable
    {
        private string endpointUri;
        private string authorizationKey;
        private string databaseId;
        private string collectionId;

        private DocumentClient client;

        public DocumentClient Client
        {
            get
            {
                if (client == null)
                {
                    client = DocumentDbHelpers.CreateDocumentClient(endpointUri, authorizationKey);
                }

                return client;
            }
        }

        private string collectionLink;

        public string CollectionLink
        {
            get
            {
                if (collectionLink == null)
                {
                    collectionLink = DocumentDbHelpers.GetDocumentCollectionLink(Client, databaseId, collectionId);
                }

                return collectionLink;
            }
        }

        public async Task<DocumentResponse<TResult>> QueryAsync<TResult>(string expression, string continuation, int take)
        {
            var feedOptions = new FeedOptions()
            {
                MaxItemCount = take,
                RequestContinuation = continuation
            };

            if (expression == null && typeof(TResult) == typeof(T))
            {
                expression = "SELECT * FROM " + collectionId;
            }

            var documentQuery = Client.CreateDocumentQuery<TResult>(CollectionLink, expression, feedOptions)
                .AsDocumentQuery();

            var documentResponse = await documentQuery.ExecuteNextAsync<TResult>();
            var documentItems = documentResponse
                .AsEnumerable()
                .ToList<TResult>();

            return new DocumentResponse<TResult>(documentItems, documentResponse.ResponseContinuation);
        }

        public Task<T> GetAsync(string id)
        {
            var document = DocumentDbHelpers.GetDocumentById(Client, CollectionLink, id);
            var original = DocumentDbHelpers.ConvertDocumentToJObject(document);
            var model = original.ToObject<T>();

            return Task.FromResult(model);
        }

        public async Task PostAsync(T model)
        {
            await Client.CreateDocumentAsync(CollectionLink, model);
        }

        public async Task<T> PatchAsync(string id, JObject changes)
        {
            var document = DocumentDbHelpers.GetDocumentById(Client, CollectionLink, id);
            var original = DocumentDbHelpers.ConvertDocumentToJObject(document);

            original.Merge(changes);
            
            var updated = original.ToObject<T>();

            await Client.ReplaceDocumentAsync(document.SelfLink, updated);

            return updated;
        }

        public void Dispose()
        {
            if (client != null)
            {
                client.Dispose();
            }
        }
        
        public DocumentStore(string endpointUri, string authorizationKey, string databaseId, string collectionId)
        {
            this.endpointUri = endpointUri;
            this.authorizationKey = authorizationKey;
            this.databaseId = databaseId;
            this.collectionId = collectionId;
        }
    }
}
