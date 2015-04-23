using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.DocumentDB
{
    public class DocumentStore : IDisposable
    {
        private ISettings settings;
        private string collectionId;

        private DocumentClient client;
        private DocumentCollection collection;
        private Database database;

        public string BuildDocumentId(params string[] values)
        {
            return string.Join("|", values);
        }

        public DocumentClient Client
        {
            get
            {
                if (client == null)
                {
                    var endpointUri = settings.GetProviderSetting(Known.Provider.AzureDocumentDB, "endpointUri");
                    var authorizationKey = settings.GetProviderSetting(Known.Provider.AzureDocumentDB, "authorizationKey");

                    client = new DocumentClient(new Uri(endpointUri), authorizationKey);
                }

                return client;
            }
        }

        public Database Database
        {
            get
            {
                if (database == null)
                {
                    var databaseId = settings.GetProviderSetting(Known.Provider.AzureDocumentDB, "databaseId");
                    
                    database = Client.CreateDatabaseQuery()
                                    .Where(d => d.Id == databaseId)
                                    .AsEnumerable()
                                    .FirstOrDefault();
                }

                return database;
            }
        }

        public DocumentCollection Collection
        {
            get
            {
                if (collection == null)
                {
                    collection = GetDocumentCollection(collectionId);
                }

                return collection;
            }
        }

        public DocumentCollection GetDocumentCollection(string collectionId)
        {
            return Client.CreateDocumentCollectionQuery(Database.SelfLink)
                            .Where(c => c.Id == collectionId)
                            .AsEnumerable()
                            .FirstOrDefault();
        }

        // http://azure.microsoft.com/en-us/documentation/articles/documentdb-dotnet-application/
        public T GetItem<T>(Expression<Func<T, bool>> predicate)
        {
            return Client.CreateDocumentQuery<T>(Collection.DocumentsLink)
                        .Where(predicate)
                        .AsEnumerable()
                        .FirstOrDefault();
        }

        public IEnumerable<T> GetItems<T>(Expression<Func<T, bool>> predicate, string documentsLink = null)
        {
            return Client.CreateDocumentQuery<T>(documentsLink ?? Collection.DocumentsLink)
                .Where(predicate)
                .AsEnumerable();
        }

        public IEnumerable<T> GetItems<T>(string sqlExpression, string documentsLink = null)
        {
            return Client.CreateDocumentQuery<T>(documentsLink ?? Collection.DocumentsLink, sqlExpression)
                .AsEnumerable();
        }

        public IEnumerable<T> GetItems<T>(SqlQuerySpec sqlQuery, string documentsLink = null)
        {
            return Client.CreateDocumentQuery<T>(documentsLink ?? Collection.DocumentsLink, sqlQuery)
                .AsEnumerable();
        } 

        public async Task<Document> UpdateItemAsync<T>(string id, T item)
        {
            var doc = GetDocument(id);

            return await Client.ReplaceDocumentAsync(doc.SelfLink, item);
        }

        private Document GetDocument(string id)
        {
            return Client.CreateDocumentQuery(Collection.DocumentsLink)
                .Where(d => d.Id == id)
                .AsEnumerable()
                .FirstOrDefault();
        }

        public async Task<Document> CreateItemAsync<T>(T item)
        {
            return await Client.CreateDocumentAsync(Collection.SelfLink, item);
        }

        public void Dispose()
        {
            if (client != null)
            {
                client.Dispose();
            }
        }

        public DocumentStore(ISettings settings, string collectionId)
        {
            this.settings = settings;
            this.collectionId = collectionId;
        }
    }
}
