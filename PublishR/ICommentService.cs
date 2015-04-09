using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface ICommentService
    {
        Task<IList<Comment>> GetComments(string uri);
        Task<Comment> GetComment(string uri);
        Task<string> AddComment(string uri, string text);
        Task UpdateComment(string uri, string text);
        Task ApproveComment(string uri);
        Task RejectComment(string uri);
        Task DeleteComment(string uri);
    }
}
