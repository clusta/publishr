using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Shared.Protocol;
using PublishR.Abstractions;
using PublishR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Azure.BlobStorage
{
    public class BlobStorageFiles : IFiles
    {
        private ISettings settings;
        private ISession session;
        private ITime time;

        private CloudStorageAccount storageAccount;

        private CloudStorageAccount StorageAccount
        {
            get
            {
                return storageAccount ?? (storageAccount = CloudStorageAccount.Parse(settings.GetSetting(Known.Provider.AzureStorage, "connectionString")));
            }
        }

        private CloudBlobClient blobClient;

        private CloudBlobClient BlobClient
        {
            get
            {
                return blobClient ?? (blobClient = StorageAccount.CreateCloudBlobClient());
            }
        }

        private CloudBlobContainer blobContainer;

        private CloudBlobContainer BlobContainer
        {
            get
            {
                return blobContainer ?? (blobContainer = BlobClient.GetContainerReference(session.Workspace));
            }
        }

        private IDictionary<string, Endpoint> BuildEndpoints(string fileName)
        {
            var policy = new SharedAccessBlobPolicy()
            {
                SharedAccessExpiryTime = time.Now.AddHours(1),
                Permissions = SharedAccessBlobPermissions.Write
            };

            var blob = BlobContainer.GetBlockBlobReference(fileName);
            var sharedAccessSignature = blob.GetSharedAccessSignature(policy);

            return new Dictionary<string, Endpoint>()
            {
                {
                    Known.Verb.Get,
                    new Endpoint() 
                    {
                        Uri = blob.Uri.ToString()
                    }
                },
                {
                    Known.Verb.Put,
                    new Endpoint() 
                    {
                        Uri = blob.Uri.ToString() + sharedAccessSignature,
                        Headers = new Dictionary<string, object>() 
                        {
                            { "x-ms-blob-type", "BlockBlob" }
                        }
                    }
                }
            };
        }

        public Task<IDictionary<string, IDictionary<string, Endpoint>>> Create(string set, IDictionary<string, File> files)
        {
            var endpoints = files.ToDictionary(k => k.Key, k => BuildEndpoints(k.Value.Name));

            return Task.FromResult<IDictionary<string, IDictionary<string, Endpoint>>>(endpoints);
        }

        public Task<Endpoint> Update(string uri, File file)
        {
            var endpoints = BuildEndpoints(file.Name);
            var putEndpoint = endpoints[Known.Verb.Put];

            return Task.FromResult(putEndpoint);
        }

        public async Task EnsureCors()
        {
            var serviceProperties = await BlobClient.GetServicePropertiesAsync();

            serviceProperties.Cors = new CorsProperties();
            serviceProperties.Cors.CorsRules.Add(new CorsRule()
            {
                AllowedHeaders = new List<string>() { "*" },
                AllowedMethods = CorsHttpMethods.Put | CorsHttpMethods.Get,
                AllowedOrigins = new List<string>() { "*" },
                ExposedHeaders = new List<string>() { "*" },
                MaxAgeInSeconds = 60 * 30
            });

            await BlobClient.SetServicePropertiesAsync(serviceProperties);
        }

        public BlobStorageFiles(ISettings settings, ISession session, ITime time)
        {
            this.settings = settings;
            this.session = session;
            this.time = time;
        }
    }
}
