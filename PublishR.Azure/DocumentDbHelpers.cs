using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Azure
{
    public static class DocumentDbHelpers
    {
        public static DocumentClient CreateDocumentClient(string endpointUri, string authorizationKey)
        {
            return new DocumentClient(new Uri(endpointUri), authorizationKey);
        }

        public static string GetDocumentCollectionLink(DocumentClient documentClient, string databaseId, string collectionId)
        {
            var database = documentClient.CreateDatabaseQuery()
                                .Where(d => d.Id == databaseId)
                                .AsEnumerable()
                                .FirstOrDefault();

            var collection = documentClient.CreateDocumentCollectionQuery(database.SelfLink)
                                .Where(c => c.Id == collectionId)
                                .AsEnumerable()
                                .FirstOrDefault();

            return collection.DocumentsLink;
        }
    }
}
