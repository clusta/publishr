using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Azure
{
    public class ArticleStore
    {
        private string endpointUri;
        private string authorizationKey;
        private string databaseId;
        private const string collectionId = "Articles";

        public async Task PostArticleAsync(Article article)
        {
            using (var documentClient = DocumentDbHelpers.CreateDocumentClient(endpointUri, authorizationKey))
            {
                var documentCollectionLink = DocumentDbHelpers.GetDocumentCollectionLink(documentClient, databaseId, collectionId);

                await documentClient.CreateDocumentAsync(documentCollectionLink, article);
            }
        }

        public ArticleStore(string endpointUri, string authorizationKey, string databaseId)
        {
            this.endpointUri = endpointUri;
            this.authorizationKey = authorizationKey;
            this.databaseId = databaseId;
        }
    }
}
