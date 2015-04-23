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

        public Task<string> AddWorkspace(string slug, string name)
        {
            throw new NotImplementedException();
        }

        public Task UpdateProperties(string id, IDictionary<string, object> properties)
        {
            throw new NotImplementedException();
        }

        public DocumentWorkspaces(ISession session, ITime time, ISettings settings) 
            : base(settings, "publishr.workspaces")
        {
            this.session = session;
            this.time = time;
        }
    }
}