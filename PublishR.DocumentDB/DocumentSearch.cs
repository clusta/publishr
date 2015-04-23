using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.DocumentDB
{
    public class DocumentSearch : DocumentStore, ISearch
    {      
        private ISession session;
        private ITime time;

        public Task<IList<Facet>> GetFacets()
        {
            var selectTags = new SqlQuerySpec()
            {
                QueryText = "SELECT VALUE c.data.tags FROM c WHERE c.workspace = @workspace AND IS_ARRAY(c.data.tags)",
                Parameters = new SqlParameterCollection()
                {
                    new SqlParameter("@workspace", session.Workspace)
                }
            };
            var tags = GetItems<string[]>(selectTags);            
            
            IList<Facet> facets = tags
                .SelectMany(t => t.ToList()).Distinct()
                .Select(t => new Facet()
                {
                    Category = Known.Facet.Tag,
                    Name = t,
                    Value = t,
                    Count = tags
                        .Where(a => a.Contains(t))
                        .Count()
                })
                .ToList();

            // TODO: configure supported kinds per workspace
            facets.Add(new Facet()
            {
                Category = Known.Facet.Kind,
                Name = "Web Page",
                Value = Known.Kind.WebPage
            });

            return Task.FromResult(facets);
        }

        public Task<Collection> Query(IDictionary<string, object> facets)
        {
            Check.BadRequestIfNull(facets);
            Check.BadRequestIfNull(facets.Count == 0);
            
            // TODO: project created time
            // TODO: filter by state
            var queryBuilder = new StringBuilder("SELECT p.id AS id, p.data.kind AS kind, p.data.cards AS cards FROM p");
            var sqlParameters = new SqlParameterCollection()
            {
                new SqlParameter("@workspace", session.Workspace)
            };

            object value = null;
            
            if (facets.TryGetValue(Known.Facet.Tag, out value) && value != null)
            {
                queryBuilder.Append(" JOIN t IN p.data.tags WHERE p.workspace = @workspace");
                queryBuilder.Append(" AND t = @tag");

                sqlParameters.Add(new SqlParameter("@tag", value));
            }
            else
            {
                queryBuilder.Append(" WHERE p.workspace = @workspace");
            }

            if (facets.TryGetValue(Known.Facet.Kind, out value) && value != null)
            {
                queryBuilder.Append(" AND p.data.kind = @kind");
                sqlParameters.Add(new SqlParameter("@kind", value));
            }

            var sqlQuery = new SqlQuerySpec()
            {
                QueryText = queryBuilder.ToString(),
                Parameters = sqlParameters
            };

            var listings = GetItems<Listing>(sqlQuery)
                .ToList();
            var collection = new Collection()
            {
                Listings = listings
            };

            return Task.FromResult(collection);
        }  

        public DocumentSearch(ISession session, ITime time, ISettings settings) 
            : base(settings, DocumentPages.PageCollectionId)
        {
            this.session = session;
            this.time = time;
        }
    }
}