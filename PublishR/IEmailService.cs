using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface IEmailService
    {
        Task Send(string to, string subject, string template, IDictionary<string, string> properties);
    }
}
