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
    public class DocumentSearch : DocumentStorage, ISearch
    {      
        private ISession session;
        private ITime time;
        private IIdentity identity;

        public Task<IList<Facet>> GetFacets(string kind)
        {
            var selectTags = new SqlQuerySpec()
            {
                QueryText = "SELECT VALUE c.content.tags FROM c WHERE c.workspace = @workspace AND IS_ARRAY(c.data.tags)",
                Parameters = new SqlParameterCollection()
                {
                    new SqlParameter("@workspace", session.Website)
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

            return Task.FromResult(facets);
        }

        public Task<Result> Search(string kind, IDictionary<string, object> facets)
        {
            Check.BadRequestIfNull(facets);
            Check.BadRequestIfNull(facets.Count == 0);
            
            var queryBuilder = new StringBuilder("SELECT p.id AS id, p.data.kind AS kind, p.data.cards AS cards FROM p");
            var sqlParameters = new SqlParameterCollection()
            {
                new SqlParameter("@workspace", session.Website)
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
            
            queryBuilder.Append(" AND p.state = @state");
            
            if (facets.TryGetValue(Known.Facet.State, out value) && value != null && identity.IsInRole(Known.Role.Author))
            {
                sqlParameters.Add(new SqlParameter("@state", value));
            }
            else
            {
                sqlParameters.Add(new SqlParameter("@state", Known.State.Approved));
            }

            var sqlQuery = new SqlQuerySpec()
            {
                QueryText = queryBuilder.ToString(),
                Parameters = sqlParameters
            };

            var listings = GetItems<Listing>(sqlQuery)
                .ToList();

            var collection = new Result()
            {
                Listings = listings
            };

            return Task.FromResult(collection);
        }  

        public DocumentSearch(ISession session, ITime time, ISettings settings, IIdentity identity) 
            : base(settings, Known.Collections.Pages)
        {
            this.session = session;
            this.time = time;
            this.identity = identity;
        }
    }
}