using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface IComments
    {
        Task<IList<Comment>> GetComments(string uri);
        Task<Comment> GetComment(string id);
        Task<string> AddComment(string id, string text);
        Task UpdateComment(string id, string text);
        Task ApproveComment(string id);
        Task RejectComment(string id);
        Task DeleteComment(string id);
    }
}
