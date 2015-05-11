using System.Collections.Generic;
using System.Threading.Tasks;

namespace PublishR.Abstractions
{
    public interface IEmailer
    {
        Task Send(string to, string subject, string template, IDictionary<string, object> properties);
    }
}
