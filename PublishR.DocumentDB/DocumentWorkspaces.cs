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
    public class DocumentWorkspaces : DocumentStore, IWorkspaces
    {      
        private ISession session;
        private ITime time;

        private DocumentResource<Workspace> Get(string id)
        {
            return GetItem<DocumentResource<Workspace>>(d => d.Id == id);
        }

        private async Task UpdateProperty(string id, object value, Action<DocumentResource<Workspace>> merge)
        {
            Check.BadRequestIfNull(id);
            Check.BadRequestIfNull(value);

            var resource = Get(id);

            Check.NotFoundIfNull(resource);

            merge(resource);

            await UpdateItemAsync(id, resource);
        }

        public async Task<string> AddWorkspace(string slug, string name)
        {
            Check.BadRequestIfNull(slug);
            Check.BadRequestIfNull(name);
            
            var id = slug;
            var now = time.Now;

            var resource = new DocumentResource<Workspace>()
            {
                Id = id,
                Workspace = id,
                Data = new Workspace()
                {
                    Name = name,
                    Created = now
                }
            };

            await CreateItemAsync(resource);

            return resource.Id;
        }

        public Task UpdateProperties(string id, IDictionary<string, object> properties)
        {
            return UpdateProperty(id, properties, c => c.Data.Properties = properties);
        }

        public DocumentWorkspaces(ISession session, ITime time, ISettings settings) 
            : base(settings, "publishr.workspaces")
        {
            this.session = session;
            this.time = time;
        }
    }
}