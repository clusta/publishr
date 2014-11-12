using PublishR.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PublishR.Server
{
    public class PageBuilder
    {
        private PageContext context;
        
        public Page FromArticle(Article article)
        {
            var articleMetadata = article.Metadata;
            var environment = context.Environment;
            var environmentMetadata = environment.Metadata;

            var page = new Page() 
            {
                Self = environment.CreateUriBuilder(article.Slug).ToString(),
                Title = article.Title,
                Cards = article.Cards,
                Profiles = article.Profiles,
                Sections = article.Sections,
                Tags = article.Tags,
                Metadata = new Metadata()
                {
                    Title = StringHelpers.FirstNonEmpty(articleMetadata.Title, environmentMetadata.Title),
                    Description = StringHelpers.FirstNonEmpty(articleMetadata.Description, environmentMetadata.Description),
                    Keywords = StringHelpers.FirstNonEmpty(articleMetadata.Keywords, environmentMetadata.Keywords),
                    Properties = DictionaryHelpers.MergeLeft(environmentMetadata.Properties, articleMetadata.Properties)
                },
                Features = DictionaryHelpers.MergeLeft(environment.Features, article.Features),
                Properties = DictionaryHelpers.MergeLeft(environment.Properties, article.Properties),
                Feeds = context.Feeds
            };

            return page;
        }

        public PageBuilder(PageContext context)
        {
            this.context = context;
        }
    }
}
