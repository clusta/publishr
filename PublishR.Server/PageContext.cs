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
        public Template Template { get; set; }
        public IQueryable<Channel> Channels { get; set; }
        public IQueryable<Article> Articles { get; set; }
        public IQueryable<Post> Posts { get; set; }
    }
}
