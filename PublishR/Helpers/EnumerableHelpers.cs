using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Helpers
{
    public static class EnumerableHelpers
    {
        public static string FirstNonEmptyValue<TSource>(this IEnumerable<TSource> source, Func<TSource, string> selector)
        {
            return source
                .Where(s => s != null)
                .Where(s => !string.IsNullOrWhiteSpace(selector(s)))
                .Select(selector)
                .FirstOrDefault();
        }

        public static IList<TItem> FirstNonEmptyValue<TSource, TItem>(this IEnumerable<TSource> source, Func<TSource, IList<TItem>> selector)
        {
            return source
                .Where(s => s != null)
                .Where(s => selector(s) != null && selector(s).Count > 0)
                .Select(selector)
                .FirstOrDefault();
        }
        
        // http://stackoverflow.com/questions/419019/split-list-into-sublists-with-linq
        public static IEnumerable<IEnumerable<T>> Chunk<T>(this IEnumerable<T> source, int chunksize)
        {
            while (source.Any())
            {
                yield return source.Take(chunksize);

                source = source.Skip(chunksize);
            }
        }

        // http://stackoverflow.com/questions/14879197/linq-query-data-aggregation-group-adjacent
        public static IEnumerable<IGrouping<TKey, TSource>> GroupAdjacent<TSource, TKey>(
            this IEnumerable<TSource> source,
            Func<TSource, TKey> keySelector)
        {
            TKey last = default(TKey);
            bool haveLast = false;

            List<TSource> list = new List<TSource>();
            
            foreach (TSource s in source)
            {
                TKey k = keySelector(s);
                if (haveLast)
                {
                    if (!k.Equals(last))
                    {
                        yield return new GroupOfAdjacent<TSource, TKey>(list, last);

                        list = new List<TSource>();
                        list.Add(s);
                        last = k;
                    }
                    else
                    {
                        list.Add(s);
                        last = k;
                    }
                }
                else
                {
                    list.Add(s);
                    last = k;
                    haveLast = true;
                }
            }

            if (haveLast)
                yield return new GroupOfAdjacent<TSource, TKey>(list, last);
        }
    }

    public class GroupOfAdjacent<TSource, TKey> : IEnumerable<TSource>, IGrouping<TKey, TSource>
    {
        public TKey Key { get; set; }
        private List<TSource> GroupList { get; set; }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return ((IEnumerable<TSource>)this).GetEnumerator();
        }

        IEnumerator<TSource> IEnumerable<TSource>.GetEnumerator()
        {
            foreach (var s in GroupList)
                yield return s;
        }

        public GroupOfAdjacent(List<TSource> source, TKey key)
        {
            GroupList = source;
            Key = key;
        }
    }
}
