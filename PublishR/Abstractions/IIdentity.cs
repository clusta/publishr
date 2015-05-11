namespace PublishR.Abstractions
{
    public interface IIdentity
    {
        string Uid { get; }
        string Name { get; }
        bool IsInRole(string roleName);
    }
}
