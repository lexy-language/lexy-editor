using System;
using System.Collections.Generic;
using System.Reflection;

namespace Lexy.Poc.Core.Compiler
{
    public class LexyExecutable
    {
        private readonly object[] emptyParameters = Array.Empty<object>();

        private readonly object functionObject;
        private readonly MethodInfo resultMethod;

        private readonly MethodInfo runMethod;
        private readonly IDictionary<string, FieldInfo> variables = new Dictionary<string, FieldInfo>();

        public LexyExecutable(object functionObject)
        {
            this.functionObject = functionObject;

            runMethod = functionObject.GetType().GetMethod("__Run", BindingFlags.Instance | BindingFlags.Public);
            resultMethod = functionObject.GetType().GetMethod("__Result", BindingFlags.Instance | BindingFlags.Public);
        }

        public LexyScriptResult Run()
        {
            runMethod.Invoke(functionObject, emptyParameters);

            return (LexyScriptResult)resultMethod.Invoke(functionObject, emptyParameters);
        }

        public LexyScriptResult Run(IDictionary<string, object> values)
        {
            foreach (var value in values)
            {
                var field = GetParameterField(value.Key);
                field.SetValue(functionObject, value.Value);
            }

            runMethod.Invoke(functionObject, emptyParameters);

            return (LexyScriptResult)resultMethod.Invoke(functionObject, emptyParameters);
        }

        private FieldInfo GetParameterField(string name)
        {
            if (variables.ContainsKey(name)) return variables[name];

            var field = functionObject.GetType().GetField(name, BindingFlags.Instance | BindingFlags.Public);
            if (field == null) throw new InvalidOperationException("Couldn't find parameter field: " + name);

            variables[name] = field;
            return field;
        }
    }
}