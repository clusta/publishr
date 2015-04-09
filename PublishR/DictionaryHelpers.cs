using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public static class DictionaryHelpers
    {
        // http://stackoverflow.com/questions/294138/merging-dictionaries-in-c-sharp
        public static IDictionary<K, V> MergeLeft<K, V>(params IDictionary<K, V>[] dictionaries)
        {
            var output = new Dictionary<K, V>();

            foreach (var dictionary in dictionaries)
            {
                if (dictionary != null)
                {
                    foreach (var pair in dictionary)
                    {
                        output[pair.Key] = pair.Value;
                    }
                }
            }

            return output;
        }
    }
}
