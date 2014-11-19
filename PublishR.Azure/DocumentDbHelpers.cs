using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
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

        public static Document GetDocumentById(DocumentClient documentClient, string collectionLink, string id)
        {
            return documentClient.CreateDocumentQuery(collectionLink)
                .Where(d => d.Id == id)
                .AsEnumerable()
                .FirstOrDefault();
        }

        public static JObject ConvertDocumentToJObject(Document document)
        {
            using (var memoryStream = new MemoryStream())
            {
                document.SaveTo(memoryStream);

                memoryStream.Position = 0;

                using (var streamReader = new StreamReader(memoryStream))
                using (var jsonTextReader = new JsonTextReader(streamReader))
                {
                    return (JObject)JObject.ReadFrom(jsonTextReader);
                }
            }
        }
    }
}
