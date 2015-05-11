namespace PublishR.Abstractions
{
    public interface IHasher
    {
        string HashString(string input);
        bool ValidateHashString(string hashed, string provided);
    }
}
