using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Azure
{
    public interface IDocumentStore<T>
    {
        Task<DocumentResponse<TResult>> QueryAsync<TResult>(string expression, string continuation, int take);
        Task<T> GetAsync(string id);
        Task PostAsync(T model);
        Task<T> PatchAsync(string id, JObject changes);
    }
}
