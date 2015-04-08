using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Services
{
    public interface ICommentService
    {
        Task<IList<Comment>> GetComments(string uri);
        Task<string> AddComment(string uri, string uid, string text);
        Task UpdateComment(string uri, string text);
        Task DeleteComment(string uri);
    }
}
