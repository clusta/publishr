using System.Threading.Tasks;

namespace PublishR.Abstractions
{
    public interface IPrivacy
    {
        Task MarkPrivate(string id);
        Task MarkPublic(string id);
    }
}
