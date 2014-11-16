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
        private Page page = new Page();

        public virtual PageBuilder MergeMetadata(params Metadata[] metadata)
        {
            var reversed = metadata.Reverse();
            
            page.Metadata = new Metadata()
            {
                Title = reversed.FirstNonEmptyValue(t => t.Title),
                Description = reversed.FirstNonEmptyValue(t => t.Description),
                Keywords = reversed.FirstNonEmptyValue(t => t.Keywords),
                Properties = DictionaryHelpers.MergeLeft(metadata.Select(m => m.Properties).ToArray())
            };

            return this;
        }

        public virtual PageBuilder MergeThemes(params Theme[] themes)
        {
            var reversed = themes.Reverse();

            page.Theme = new Theme()
            {
                Color = reversed.FirstNonEmptyValue(t => t.Color),                
                Backgrounds = reversed.FirstNonEmptyValue(t => t.Backgrounds),
                Covers = reversed.FirstNonEmptyValue(t => t.Covers),
                Logos = reversed.FirstNonEmptyValue(t => t.Logos),
                Icons = reversed.FirstNonEmptyValue(t => t.Icons),
                Embeds = DictionaryHelpers.MergeLeft(themes.Select(t => t.Embeds).ToArray()),
                Properties = DictionaryHelpers.MergeLeft(themes.Select(t => t.Properties).ToArray())
            };

            return this;
        }

        public virtual PageBuilder MergeCards(params IDictionary<string, Card>[] cards)
        {
            page.Cards = DictionaryHelpers.MergeLeft(cards);

            return this;
        }

        public virtual PageBuilder MergeFeeds(params IDictionary<string, Feed>[] feeds)
        {
            page.Feeds = DictionaryHelpers.MergeLeft(feeds);

            return this;
        }

        public virtual PageBuilder MergeFeatures(params IDictionary<string, Feature>[] features)
        {
            page.Features = DictionaryHelpers.MergeLeft(features);

            return this;
        }

        public virtual PageBuilder MergeProperties(params IDictionary<string, object>[] properties)
        {
            page.Properties = DictionaryHelpers.MergeLeft(properties);

            return this;
        }

        public virtual PageBuilder MergeSections(params IList<Section>[] sections)
        {
            page.Sections = sections.SelectMany(l => l).ToList();

            return this;
        }

        public virtual PageBuilder MergeLinks(params IList<Link>[] links)
        {
            page.Links = links.SelectMany(l => l).ToList();

            return this;
        }

        public virtual PageBuilder MergeContent(Article article)
        {
            page.Title = article.Title;
            page.Description = article.Description;
            page.Profiles = article.Profiles;
            page.Tags = article.Tags;
            page.Contacts = article.Contacts;
            page.Events = article.Events;
            page.Prices = article.Prices;
            page.Metrics = article.Metrics;

            return this;
        }

        public virtual PageBuilder GenerateSelfLink(bool secure, string hostname, string slug)
        {
            var scheme = secure ? "https" : "http";
            var uriBuilder = new UriBuilder(scheme, hostname);

            uriBuilder.Path = slug;

            page.Self = uriBuilder.ToString();

            return this;
        }

        public Page ToPage()
        {
            return page;
        }
    }
}
