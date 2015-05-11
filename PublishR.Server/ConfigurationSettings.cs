using PublishR.Abstractions;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Server
{
    public class ConfigurationSettings : ISettings
    {
        public string GetSetting(string provider, string key)
        {
            var appSettingKey = string.Join(":", provider, key);
            
            return ConfigurationManager.AppSettings[appSettingKey];
        }
    }
}
