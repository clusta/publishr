using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
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
                return storageAccount ?? (storageAccount = CloudStorageAccount.Parse(settings.GetSetting(Known.Provider.AzureBlobStorage, "connectionString")));
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
                    Known.Verb.Post,
                    new Endpoint() 
                    {
                        Uri = blob.Uri.ToString() + sharedAccessSignature
                    }
                }
            };
        }

        public IDictionary<string, IDictionary<string, Endpoint>> CreateFiles(string set, IDictionary<string, File> files)
        {
            return files.ToDictionary(k => k.Key, k => BuildEndpoints(k.Value.Name));
        }

        public Endpoint UpdateFile(string uri, File file)
        {
            return BuildEndpoints(file.Name)[Known.Verb.Post];
        }

        public BlobStorageFiles(ISettings settings, ISession session, ITime time)
        {
            this.settings = settings;
            this.session = session;
            this.time = time;
        }
    }
}
