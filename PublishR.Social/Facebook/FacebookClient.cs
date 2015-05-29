using PublishR.Abstractions;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Facebook
{
    public class FacebookClient : IFacebookClient
    {
        private ISettings settings;

        public async Task<Result> GetRecentPosts(string profileId, int limit)
        {
            var connection = profileId + "/posts";
            var graphResponse = await GetGraphResponse<FacebookPost>(connection, limit);

            return new Result()
            {
                Data = graphResponse.Data
                    .Select(p => p.ToLising())
                    .ToList()
            };   
        }

        public async Task<FacebookResponse<T>> GetGraphResponse<T>(string connection, int limit)
        {
            var formatters = new MediaTypeFormatterCollection();

            formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/javascript"));

            using (var httpClient = new HttpClient())
            {
                var facebookAppId = settings.GetSetting(Known.Provider.Facebook, "appId");
                var facebookAppSecret = settings.GetSetting(Known.Provider.Facebook, "appSecret");
                var facebookAccessToken = string.Format("{0}|{1}", facebookAppId, facebookAppSecret);
                var facebookUri = string.Format("https://graph.facebook.com/{0}?access_token={1}&limit={2}", connection, facebookAccessToken, limit);

                var facebookResponse = await httpClient.GetAsync(facebookUri);

                if (facebookResponse.IsSuccessStatusCode)
                {
                    return await facebookResponse.Content.ReadAsAsync<FacebookResponse<T>>(formatters);
                }
                else
                {
                    return null;
                }
            }
        }
        
        public FacebookClient(ISettings settings)
        {
            this.settings = settings;
        }
    }
}
