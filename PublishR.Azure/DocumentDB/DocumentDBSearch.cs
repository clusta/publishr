using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using PublishR.Abstractions;
using PublishR.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Azure.DocumentDB
{
    public class DocumentDBSearch : DocumentDBProvider, ISearch
    {      
        private ISession session;
        private IIdentity identity;

        public Task<IList<Facet>> GetFacets(string kind)
        {
            var selectTags = new SqlQuerySpec()
            {
                QueryText = "SELECT VALUE p.data.tags FROM p WHERE p.meta.workspace = @workspace AND p.meta.kind = @kind AND ARRAY_LENGTH(p.data.tags) > 0",
                Parameters = new SqlParameterCollection()
                {
                    new SqlParameter("@workspace", session.Workspace),
                    new SqlParameter("@kind", kind)
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

        public Task<Result> Search(string kind, IDictionary<string, object> facets, string continuation)
        {
            Check.BadRequestIfNull(kind);

            var queryBuilder = new StringBuilder("SELECT p.id AS id, p.meta AS meta, p.data.cards AS cards FROM p WHERE p.meta.workspace = @workspace AND p.meta.kind = @kind AND p.meta.state = @state");
            var sqlParameters = new SqlParameterCollection()
            {
                new SqlParameter("@workspace", session.Workspace),
                new SqlParameter("@kind", kind)
            };

            object value = null;
            
            if (facets != null && facets.TryGetValue(Known.Facet.Tag, out value) && value != null)
            {
                queryBuilder.Append(" AND ARRAY_CONTAINS(p.data.tags, @tag)");
                sqlParameters.Add(new SqlParameter("@tag", value));
            }

            if (facets != null && facets.TryGetValue(Known.Facet.State, out value) && value != null && identity.IsInRole(Known.Role.Author))
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

            IList listings = GetItems<Listing>(sqlQuery)
                .ToList();

            var collection = new Result()
            {
                Data = listings
            };

            return Task.FromResult(collection);
        }  

        public DocumentDBSearch(ISession session, ISettings settings, IIdentity identity) 
            : base(settings, Known.Collections.Pages)
        {
            this.session = session;
            this.identity = identity;
        }
    }
}