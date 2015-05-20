using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social
{
    public interface IInstagramClient
    {
        Task<IEnumerable<Listing>> GetRecentPosts(string userId, int limit);
    }
}
