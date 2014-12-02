using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Azure
{
    public abstract class InMemoryDocumentStore<T> : IDocumentStore<T> where T : class
    {
        private ConcurrentDictionary<string, T> dictionary = new ConcurrentDictionary<string, T>();
        
        public Task<DocumentResponse<TResult>> QueryAsync<TResult>(string expression, string continuation, int take)
        {
            int skip = int.TryParse(continuation, out skip) ? skip : 0;
            
            IList<TResult> filtered;

            if (expression == null && typeof(TResult) == typeof(T))
            {
                filtered = dictionary.Values.Cast<TResult>().ToList();
            }
            else
            {
                filtered = EvaluateQueryExpression<TResult>(dictionary.Values, expression);
            }

            var items = filtered
                .Skip(skip)
                .Take(take)
                .ToList();

            var nextContinuation = (skip + items.Count()).ToString();
            var documentResponse = new DocumentResponse<TResult>(items, nextContinuation);

            return Task.FromResult(documentResponse);
        }

        public abstract IList<TResult> EvaluateQueryExpression<TResult>(ICollection<T> items, string expression);

        public Task<T> GetAsync(string id)
        {
            T model = dictionary.TryGetValue(id, out model) ? model : null;

            return Task.FromResult(model);
        }

        public Task PostAsync(T model)
        {
            return Task.Run(() =>
            {
                var json = JObject.FromObject(model);
                var id = json.Value<string>("id");

                dictionary[id] = model;
            });
        }

        public Task<T> PatchAsync(string id, JObject changes)
        {
            var original = dictionary[id];
            var originalJson = JObject.FromObject(original);

            originalJson.Merge(changes);

            var updated = originalJson.ToObject<T>();

            dictionary[id] = updated;
            
            return Task.FromResult(updated);
        }
    }
}
