import React, {createElement} from 'react';
import {EditorContextProvider} from "./editor/context";
import {ProjectContextProvider, ProjectHandlers} from "./project/context";
import {ComponentProps} from "../infrastructure/componentProps";
import {CompilationContextProvider, CompilationHandlers} from "./compilation/context";

export const Contexts = (props: ComponentProps) => {
  const handlers = [
    ...CompilationHandlers,
    ...ProjectHandlers,
    CompilationContextProvider,
    ProjectContextProvider,
    EditorContextProvider
  ];

  let element;
  for (const handler of handlers) {
    element = createElement(handler, element ? {children: element} : props);
  }
  return <>{element}</>;
};
