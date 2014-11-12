using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Server
{
    public class PageContext
    {
        public Environment Environment { get; set; }
        public IQueryable<Channel> Channels { get; set; }
        public IQueryable<Article> Articles { get; set; }
        public IQueryable<Post> Posts { get; set; }
        public string[] Tags { get; set; }
        public IDictionary<string, Feed> Feeds { get; set; }
    }
}
