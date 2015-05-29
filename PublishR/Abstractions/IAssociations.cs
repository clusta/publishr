using PublishR.Models;
using System.Threading.Tasks;

namespace PublishR.Abstractions
{
    public interface IAssociations
    {
        Task<Result> ListAssociation(string id, string associationName);
        Task UpdateAssociation(string id, string associationName, string[] items);
        Task AppendAssociation(string id, string associationName, string[] items);
    }
}
