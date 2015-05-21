using PublishR.Abstractions;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Twitter
{
    public class TwitterClient : ITwitterClient
    {
        private ISettings settings;

        // https://dev.twitter.com/rest/reference/get/statuses/user_timeline
        public async Task<IEnumerable<Listing>> GetRecentPosts(string screenName, int limit) 
        {
            var twitterConsumerKey = settings.GetSetting(Known.Provider.Twitter, "consumerKey");
            var twitterConsumerSecret = settings.GetSetting(Known.Provider.Twitter, "consumerSecret");
            var twitterAccessToken = await GetAccessToken(twitterConsumerKey, twitterConsumerSecret);
            
            using (var httpClient = new HttpClient())
            {                
                var twitterStatusUri = string.Format("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name={0}&count={1}", screenName, limit);

                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", twitterAccessToken);
                
                var httpResponse = await httpClient.GetAsync(twitterStatusUri);

                if (httpResponse.IsSuccessStatusCode)
                {
                    var twitterResponse = await httpResponse.Content.ReadAsAsync<TwitterTweet[]>();

                    return twitterResponse
                        .Select(p => p.ToListing())
                        .ToList();
                }
                else
                {
                    return Enumerable.Empty<Listing>();
                }
            }
        }

        // https://dev.twitter.com/oauth/application-only
        public async Task<string> GetAccessToken(string consumerKey, string consumerSecret)
        {
            using (var httpClient = new HttpClient())
            {  
                var bearerToken = WebUtility.UrlEncode(consumerKey) + ":" + WebUtility.UrlEncode(consumerSecret);
                var bearerTokenEncoded = Convert.ToBase64String(Encoding.UTF8.GetBytes(bearerToken));
                var twitterOAuthUri = "https://api.twitter.com/oauth2/token";

                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", bearerTokenEncoded);

                var formContent = new FormUrlEncodedContent(new[] 
                {
                    new KeyValuePair<string, string>("grant_type", "client_credentials")
                });

                var httpResponse = await httpClient.PostAsync(twitterOAuthUri, formContent);

                if (httpResponse.IsSuccessStatusCode)
                {
                    var twitterResponse = await httpResponse.Content.ReadAsAsync<TwitterToken>();

                    return twitterResponse.AccessToken;
                }
                else
                {
                    return null;
                }
            }
        }

        public TwitterClient(ISettings settings) 
        {
            this.settings = settings;
        }
    }
}
