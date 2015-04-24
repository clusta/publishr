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
    public class DocumentComments : DocumentStore, IComments
    {      
        private ISession session;
        private ITime time;
        private IIdentity identity;

        private DocumentResource<Comment> Get(string id)
        {
            return GetItem<DocumentResource<Comment>>(d => d.Id == id);
        }

        private Task UpdateProperty(string id, object value, Action<DocumentResource<Comment>> merge)
        {
            Check.BadRequestIfNull(id);
            Check.BadRequestIfNull(value);

            var resource = Get(id);

            Check.NotFoundIfNull(resource);

            merge(resource);

            return UpdateItemAsync(id, resource);
        }

        public Task<IList<Comment>> GetComments(string uri)
        {
            Check.BadRequestIfNull(uri);

            var selectComments = new SqlQuerySpec()
            {
                QueryText = "SELECT VALUE c.data FROM c WHERE c.parent = @parent AND c.workspace = @workspace",
                Parameters = new SqlParameterCollection()
                {
                    new SqlParameter("@parent", uri),
                    new SqlParameter("@workspace", session.Workspace)
                }
            };

            IList<Comment> comments = GetItems<Comment>(selectComments)
                .OrderBy(c => c.Created)
                .ToList();

            return Task.FromResult(comments);
        }

        public Task<Comment> GetComment(string id)
        {
            var comment = Get(id);

            Check.NotFoundIfNull(comment);
            Check.NotFoundIfNull(comment.Data);

            return Task.FromResult(comment.Data);
        }

        public async Task<string> CreateComment(string uri, Block content)
        {
            Check.BadRequestIfNull(uri);
            Check.BadRequestIfNull(content);
            Check.BadRequestIfNull(content.Text);
            
            var id = Guid.NewGuid().ToString();
            var now = time.Now;

            var resource = new DocumentResource<Comment>()
            {
                Id = id,
                Workspace = session.Workspace,
                Parent = uri,
                State = Known.State.Submitted,
                Data = new Comment()
                {
                    Author = new Author()
                    {
                        Name = identity.Name,
                        Uri = identity.Uid
                    },
                    Content = content,
                    Created = now
                }
            };

            await CreateItemAsync(resource);

            return resource.Id;
        }

        public Task UpdateComment(string id, Block content)
        {
            return UpdateProperty(id, content, c => c.Data.Content = content);
        }

        public Task ApproveComment(string id)
        {
            return UpdateProperty(id, Known.State.Approved, c => c.State = Known.State.Approved);
        }

        public Task RejectComment(string id)
        {
            return UpdateProperty(id, Known.State.Rejected, c => c.State = Known.State.Rejected);
        }

        public Task DeleteComment(string id)
        {
            return UpdateProperty(id, Known.State.Deleted, c => c.State = Known.State.Deleted);
        }
        
        public DocumentComments(ISession session, ITime time, ISettings settings, IIdentity identity) 
            : base(settings, "publishr.comments")
        {
            this.session = session;
            this.time = time;
            this.identity = identity;
        }
    }
}