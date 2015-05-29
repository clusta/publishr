using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social
{
    public interface ITwitterClient
    {
        Task<Result> GetRecentPosts(string screenName, int limit);
    }
}
