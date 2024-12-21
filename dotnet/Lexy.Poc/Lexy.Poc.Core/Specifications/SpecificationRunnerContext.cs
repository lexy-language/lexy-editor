using System;
using System.Collections.Generic;
using System.Linq;
using Lexy.Poc.Core.Language;

namespace Lexy.Poc.Core.Specifications
{
    public interface ISpecificationRunnerContext
    {
        int Failed { get; }
        IReadOnlyCollection<ISpecificationFileRunner> FileRunners { get; }

        IList<string> DebugMessages { get; }
        IList<string> Messages { get; }

        void Fail(Scenario scenario, string message);
        void LogGlobal(string message);
        void Log(string message);
        void Success(Scenario scenario);
        void LogDebug(string message);
        void Add(ISpecificationFileRunner fileRunner);
        IEnumerable<IScenarioRunner> FailedScenariosRunners();
        int CountScenarios();
    }

    public class SpecificationRunnerContext : ISpecificationRunnerContext, IDisposable
    {
        private readonly List<ISpecificationFileRunner> fileRunners = new List<ISpecificationFileRunner>();
        private IServiceProvider serviceProvider;

        public IList<string> DebugMessages { get; } = new List<string>();
        public IList<string> Messages { get; } = new List<string>();

        public int Failed { get; private set; }

        public IReadOnlyCollection<ISpecificationFileRunner> FileRunners => fileRunners;

        public SpecificationRunnerContext(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
        }

        public void Fail(Scenario scenario, string message)
        {
            Failed++;
            Messages.Add($"- FAILED  - {scenario.Name}: " + message);
        }

        public void LogGlobal(string message)
        {
            Messages.Add($"{message}");
        }

        public void Log(string message)
        {
            Messages.Add($"  {message}");
        }

        public void Success(Scenario scenario)
        {
            Messages.Add($"- SUCCESS - {scenario.Name}");
        }

        public void LogDebug(string message)
        {
            DebugMessages.Add(message);
        }

        public void Add(ISpecificationFileRunner fileRunner)
        {
            fileRunners.Add(fileRunner);
        }

        public void Dispose()
        {
            foreach (var fileRunner in fileRunners)
            {
                fileRunner.Dispose();
            }
        }

        public IEnumerable<IScenarioRunner> FailedScenariosRunners()
        {
            return fileRunners
                .SelectMany(runner => runner.ScenarioRunners)
                .Where(scenario => scenario.Failed);
        }

        public int CountScenarios()
        {
            return FileRunners.Select(fileRunner => fileRunner.CountScenarioRunners())
                .Aggregate((value, total) => value + total);
        }

    }
}