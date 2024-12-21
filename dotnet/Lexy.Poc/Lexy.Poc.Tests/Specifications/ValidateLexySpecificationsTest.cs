using Lexy.Poc.Core.Specifications;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace Lexy.Poc.Specifications
{
    public class ValidateLexySpecificationsTest : ScopedServicesTestFixture
    {
        [Test]
        public void AllSpecifications()
        {
            var runner = ServiceProvider.GetRequiredService<ISpecificationsRunner>();
            runner.RunAll("../../../../../../laws/Specifications");
        }
    }
}