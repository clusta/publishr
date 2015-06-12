namespace PublishR.Abstractions
{
    public interface IIdentity
    {
        string Id { get; }
        string Name { get; }
        bool IsInRole(string roleName);
    }
}
