using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PublishR
{
    public static class Known
    {
        public static class Collections
        {
            public const string Pages = "publishr.pages";
            public const string Comments = "publishr.comments";
            public const string Users = "publishr.users";
        }
        
        public static class Kind
        {
            public const string Website = "website";
            public const string WebPage = "web_page";
            public const string BlogPost = "blog_post";
            public const string CaseStudy = "case_study";
            public const string Service = "service";
            public const string Event = "event";
            public const string Catalog = "catalog";
            public const string Product = "product";
            public const string Client = "client";
            public const string Place = "place";
            public const string Profile = "profile";
            public const string Comment = "comment";
        }

        public static class Facet
        {
            public const string Query = "query";
            public const string Kind = "kind";
            public const string Tag = "tag";
            public const string State = "state";
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
            public const string AzureDocumentDB = "azure_documentdb";
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
            public const string Deleted = "deleted";
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

        public static class Regex
        {
            // https://github.com/dotnet/corefx/blob/master/src/System.ComponentModel.Annotations/src/System/ComponentModel/DataAnnotations/EmailAddressAttribute.cs
            public const string Email = @"^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$";
            // https://github.com/dotnet/corefx/blob/master/src/System.ComponentModel.Annotations/src/System/ComponentModel/DataAnnotations/UrlAttribute.cs
            public const string Uri = @"^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$";
        }

        public static class Role
        {
            public const string Author = "author";
            public const string Moderator = "moderator";
            public const string Editor = "editor";
            public const string Owner = "owner";
            public const string Administrator = "administrator";
        }

        public static class Privacy
        {
            public const string Public = "public";
            public const string Private = "private";
        }

        public static class Token
        {
            public const string Password = "password";
            public const string Invite = "invite";
            public const string Reset = "reset";
        }
    }
}