using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public static class Known
    {
        public static class Kind
        {
            public const string WebPage = "web_page";
            public const string BlogPost = "blog_post";
            public const string CaseStudy = "case_study";
            public const string Service = "service";
            public const string Event = "event";
            public const string Catalog = "catalog";
            public const string Product = "product";
            public const string Client = "client";
            public const string Place = "place";
        }

        public static class Provider
        {
            public const string Facebook = "facebook";
            public const string Twitter = "twitter";
            public const string GooglePlus = "google_plus";
            public const string GoogleAnalytics = "google_analytics";
            public const string AmazonS3 = "amazon_s3";
            public const string YouTube = "youtube";
            public const string Vimeo = "vimeo";
            public const string LinkedIn = "linkedin";
            public const string Instagram = "instagram";
            public const string AzureBlobStorage = "azure_blob_storage";
            public const string Bing = "bing";
            public const string Spotify = "spotify";
            public const string GitHub = "github";
        }

        public static class Card
        {
            public const string Small = "small";
            public const string Medium = "medium";
            public const string Large = "large";
            public const string Facebook = "facebook";
            public const string Twitter = "twitter";
        }

        public static class Media
        {
            public const string Picture = "picture";
            public const string Video = "video";
            public const string Embed = "embed";
            public const string Attachment = "attachment";
        }

        public static class Section
        {
            public const string Text = "text";
            public const string Media = "media";
            public const string Embed = "embed";
            public const string Sponsored = "sponsored";
            public const string Related = "related";
            public const string Next = "next";
            public const string Download = "download";
        }

        public static class Region
        {
            public const string Cover = "cover";
            public const string Header = "header";
            public const string Content = "content";
            public const string Footer = "footer";
            public const string Aside = "aside";
        }

        public static class Environment
        {
            public const string Development = "development";
            public const string Test = "test";
            public const string Staging = "staging";
            public const string Production = "production";
        }

        public static class State
        {
            public const string Draft = "draft";
            public const string Submitted = "submitted";
            public const string Approved = "approved";
            public const string Rejected = "rejected";
            public const string Archived = "archived";            
        }

        public static class Field
        {
            public const string Text = "text";
            public const string TextArea = "textarea";
            public const string Select = "select";
            public const string Checkbox = "checkbox";
            public const string Radio = "radio";
            public const string Number = "number";
        }
    }
}