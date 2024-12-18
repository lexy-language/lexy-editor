using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Lexy.Poc.Core.Compiler;
using Lexy.Poc.Core.Language;

namespace Lexy.Poc.Core.Specifications
{
    public class SpecificationRunner
    {
        private readonly Scenario scenario;
        private readonly Function function;
        private readonly Components components;

        private SpecificationRunner(Components components, Scenario scenario, Function function)
        {
            this.components = components;
            this.scenario = scenario;
            this.function = function;
        }

        public static SpecificationRunner Create(Scenario scenario, Components components)
        {
            if (scenario == null) throw new ArgumentNullException(nameof(scenario));
            if (components == null) throw new ArgumentNullException(nameof(components));

            var function = components.GetFunction(scenario.FunctionName.Value);

            return new SpecificationRunner(components, scenario, function);
        }

        public void Run(SpecificationRunnerContext context)
        {
            if (scenario.HasErrors)
            {
                context.Fail(scenario, $"Parsing scenario failed: {scenario.FunctionName}");
                foreach (var message in scenario.FailedMessages)
                {
                    context.Log(message);
                }
                return;
            }

            if (function == null)
            {
                context.Fail(scenario, $"Function not found: {scenario.FunctionName}");
                return;
            }

            if (ValidateErrors(context)) return;

            var compiler = new LexyCompiler();
            var environment = compiler.Compile(components, function);
            var executable = environment.GetFunction(function);
            var values = GetValues(scenario.Parameters, function.Parameters, environment);

            var result = executable.Run(values);

            var validationResult = new StringWriter();
            foreach (var expected in scenario.Results.Assignments)
            {
                var actual = result[expected.Name];

                var expectedValue = TypeConverter.Convert(environment, expected.Value,
                    function.Results.GetParameterType(expected.Name));

                if (Comparer.Default.Compare(actual, expectedValue) != 0)
                {
                    validationResult.WriteLine($"'{expected.Name}' should be '{expectedValue}' but is '{actual}'");
                }
            }

            var validationResultText = validationResult.ToString();
            if (validationResultText.Length > 0)
            {
                context.Fail(scenario, validationResultText);
            }
            else
            {
                context.Success(scenario);
            }
        }

        private bool ValidateErrors(SpecificationRunnerContext context)
        {
            if (function.FailedMessages.Any())
            {
                ValidateFunctionErrors(context);
                return true;
            }

            if (scenario.ExpectError.HasValue)
            {
                context.Fail(scenario, $"Exception expected but didn't occur: {scenario.ExpectError.Message}");
                return true;
            }

            return false;
        }

        private void ValidateFunctionErrors(SpecificationRunnerContext context)
        {
            if (!scenario.ExpectError.HasValue)
            {
                context.Fail(scenario, "Exception occured: " + Format(function.FailedMessages));
                return;
            }

            foreach (var message in function.FailedMessages)
            {
                if (!message.Contains(scenario.ExpectError.Message))
                {
                    context.Fail(scenario,
                        $"Wrong exception {Environment.NewLine}  Expected: {scenario.ExpectError.Message}{Environment.NewLine}  Actual: {message}");
                    return;
                }
            }

            context.Success(scenario);
        }

        private string Format(IEnumerable<string> functionFailedMessages)
        {
            return string.Join(Environment.NewLine, functionFailedMessages);
        }

        private IDictionary<string, object> GetValues(ScenarioParameters scenarioParameters,
            FunctionParameters functionParameters, ExecutionEnvironment environment)
        {
            var result = new Dictionary<string, object>();
            foreach (var parameter in scenarioParameters.Assignments)
            {
                var type = functionParameters.Variables.FirstOrDefault(variable => variable.Name == parameter.Name);
                if (type == null)
                {
                    throw new InvalidOperationException($"Function parameter '{parameter.Name}' not found.");
                }
                var value = GetValue(environment, parameter.Value, type);
                result.Add(parameter.Name, value);
            }
            return result;
        }

        private object GetValue(ExecutionEnvironment environment, string value, VariableDefinition definition)
        {
            return TypeConverter.Convert(environment, value, definition.Type);
        }
    }
}