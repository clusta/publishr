using System;

namespace PublishR.Abstractions
{
    public interface ITime
    {
        DateTime Now { get; }
    }
}
