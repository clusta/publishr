using PublishR.Exceptions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace PublishR
{
    public static class Check
    {
        public static void UnauthorizedIfNull(object value)
        {
            ThrowIfNull<UnauthorizedAccessException>(value);
        }

        public static void UnauthorizedIfFalse(bool condition)
        {
            ThrowIfFalse<UnauthorizedAccessException>(condition);
        }

        public static void BadRequestIfNull(object value)
        {
            ThrowIfNull<ArgumentException>(value);
        }

        public static void BadRequestIfFalse(bool condition)
        {
            ThrowIfFalse<ArgumentException>(condition);
        }

        public static void BadRequestIfUnmatched(string pattern, string value)
        {
            var regex = new Regex(pattern, RegexOptions.IgnoreCase | RegexOptions.ExplicitCapture);

            ThrowIfFalse<ArgumentException>(regex.Match(value).Length > 0);
        }

        public static void ForbiddenIfFalse(bool condition)
        {
            ThrowIfFalse<ForbiddenException>(condition);
        }

        public static void ForbiddenIfTrue(bool condition)
        {
            ThrowIfFalse<ForbiddenException>(!condition);
        }

        public static void BadRequestIfTrue(bool condition)
        {
            ThrowIfFalse<ArgumentException>(!condition);
        }

        public static bool IsValid(object model)
        {
            var validationContext = new ValidationContext(model);
            var validationResults = new List<ValidationResult>();

            return Validator.TryValidateObject(model, validationContext, validationResults);
        }

        public static void BadRequestIfInvalid(object model)
        {
            ThrowIfNull<ArgumentException>(model);

            var isValid = IsValid(model);

            ThrowIfFalse<ArgumentException>(isValid);
        }

        public static void NotFoundIfNull(object value)
        {
            ThrowIfNull<NotFoundException>(value);
        }

        public static void NotFoundIfFalse(bool condition)
        {
            ThrowIfFalse<NotFoundException>(condition);
        }

        public static void NotFoundIfTrue(bool condition)
        {
            ThrowIfFalse<NotFoundException>(!condition);
        }

        public static void DuplicateIfTrue(bool condition)
        {
            ThrowIfFalse<DuplicateException>(!condition);
        }

        public static void ThrowIfNull<TException>(object value) where TException : Exception, new()
        {
            if (value == null || (value is string && string.IsNullOrWhiteSpace((string)value)))
            {
                throw new TException();
            }
        }

        public static void ThrowIfFalse<TException>(bool condition) where TException : Exception, new()
        {
            if (!condition)
            {
                throw new TException();
            }
        }
    }
}
