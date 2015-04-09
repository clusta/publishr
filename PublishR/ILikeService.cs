using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public interface ILikeService
    {
        Task<string[]> GetLikes();
        Task Like(string uri);
        Task Unlike(string uri);
    }
}
