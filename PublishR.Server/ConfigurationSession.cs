using PublishR.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Server
{
    public class ConfigurationSession : ISession
    {
        private ISettings settings;
        
        public string Workspace
        {
            get 
            {
                return settings.GetSetting(Known.Provider.PublishR, "workspace");
            }
        }

        public ConfigurationSession(ISettings settings)
        {
            this.settings = settings;
        }
    }
}
