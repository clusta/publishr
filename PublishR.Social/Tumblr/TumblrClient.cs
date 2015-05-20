using PublishR.Abstractions;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Tumblr
{
    public class TumblrClient : ITumblrClient
    {
        private ISettings settings;

        public async Task<IEnumerable<Listing>> GetRecentPosts(string tumblrAlias, int limit) 
        {
            using (var httpClient = new HttpClient())
            {
                var tumblrConsumerKey = settings.GetSetting(Known.Provider.Tumblr, "consumerKey");              
                var tumblrPostsUri = string.Format("http://api.tumblr.com/v2/blog/{0}.tumblr.com/posts?api_key={1}&limit={2}&offset=0", tumblrAlias, tumblrConsumerKey, limit);
                var httpResponse = await httpClient.GetAsync(tumblrPostsUri);

                if (httpResponse.IsSuccessStatusCode)
                {
                    var tumblrResponse = await httpResponse.Content.ReadAsAsync<TumblrResponse>();

                    return tumblrResponse
                        .Response
                        .Posts
                        .Select(p => p.ToListing())
                        .ToList();
                }
                else
                {
                    return Enumerable.Empty<Listing>();
                }
            }
        }

        public TumblrClient(ISettings settings) 
        {
            this.settings = settings;
        }
    }
}
