using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Services
{
    public interface ILikeService
    {
        Task<string[]> GetLikes(string uid);
        Task Like(string uri, string uid);
        Task Unlike(string uri, string uid);
    }
}
