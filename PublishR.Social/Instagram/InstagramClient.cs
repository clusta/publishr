using PublishR.Abstractions;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Social.Instagram
{
    public class InstagramClient : IInstagramClient
    {
        private ISettings settings;

        // https://instagram.com/developer/endpoints/users/#get_users_media_recent
        public async Task<Result> GetRecentPosts(string userId, int limit) 
        {
            using (var httpClient = new HttpClient())
            {
                var instagramClientId = settings.GetSetting(Known.Provider.Instagram, "clientId");
                var instagramMediaUri = string.Format("https://api.instagram.com/v1/users/{0}/media/recent/?client_id={1}&count={2}", userId, instagramClientId, limit);
                var httpResponse = await httpClient.GetAsync(instagramMediaUri);

                if (httpResponse.IsSuccessStatusCode)
                {
                    var instagramResponse = await httpResponse.Content.ReadAsAsync<InstagramResponse<InstagramMedia>>();

                    return new Result()
                    {
                        Data = instagramResponse
                                .Data
                                .Select(m => m.ToListing())
                                .ToList()
                    };
                }
                else
                {
                    return Result.Empty();
                }
            }
        }

        public InstagramClient(ISettings settings) 
        {
            this.settings = settings;
        }
    }
}
