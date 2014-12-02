using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Azure
{
    public class DocumentResponse<T> : ReadOnlyCollection<T>
    {
        public string Continuation { get; private set; }
        
        public DocumentResponse(IList<T> items, string continuation) : base(items)
        {
            Continuation = continuation;
        }
    }
}
