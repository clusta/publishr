using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Abstractions
{
    public interface IAssets
    {
        IDictionary<string, IDictionary<string, Asset>> GetAssetTemplates();
        IList<IDictionary<string, Source>> GetAssets(string assetTemplate);
        IList<IDictionary<string, Endpoint>> GenerateSignedEndpoints(string assetTemplate);
    }
}
