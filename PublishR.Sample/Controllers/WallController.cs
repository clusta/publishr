using PublishR.Abstractions;
using PublishR.Azure.BlobStorage;
using PublishR.Models;
using PublishR.Social;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace PublishR.Sample.Controllers
{
    [RoutePrefix("api/wall")]
    public class WallController : ApiController
    {
        private IFacebookClient facebookClient;
        private ITumblrClient tumblrClient;
        private IInstagramClient instagramClient;
        private ITwitterClient twitterClient;
        private ISettings settings;
        
        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> GetRecentPosts()
        {
            var facebookProfileId = settings.GetSetting(Known.Provider.Facebook, "profileId");
            var tumblrAlias = settings.GetSetting(Known.Provider.Tumblr, "alias");
            var instagramUserId = settings.GetSetting(Known.Provider.Instagram, "userId");
            var twitterScreenName = settings.GetSetting(Known.Provider.Twitter, "screenName");
            var limit = 20;
            
            var wall = new Dictionary<string, IEnumerable<Listing>>() 
            {
                { 
                    Known.Provider.Facebook, 
                    await facebookClient.GetRecentPosts(facebookProfileId, limit)
                },
                {
                    Known.Provider.Tumblr,
                    await tumblrClient.GetRecentPosts(tumblrAlias, limit)
                },
                {
                    Known.Provider.Instagram,
                    await instagramClient.GetRecentPosts(instagramUserId, limit)
                },
                {
                    Known.Provider.Twitter,
                    await twitterClient.GetRecentPosts(twitterScreenName, limit)
                }
            };
            
            return Ok(wall);
        }

        public WallController(ISettings settings, IFacebookClient facebookClient, ITumblrClient tumblrClient, IInstagramClient instagramClient, ITwitterClient twitterClient)
        {
            this.settings = settings;
            this.facebookClient = facebookClient;
            this.tumblrClient = tumblrClient;
            this.twitterClient = twitterClient;
            this.instagramClient = instagramClient;
        }
    }
}