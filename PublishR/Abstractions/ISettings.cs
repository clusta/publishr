namespace PublishR.Abstractions
{
    public interface ISettings
    {
        string GetSetting(string provider, string key);
    }
}
