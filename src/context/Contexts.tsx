import React from 'react';
import {EditorContextProvider} from "./editorContext";

type ContextsProps = {
  children: React.ReactNode;
};

export const Contexts = ({children}: ContextsProps) => {
  return <EditorContextProvider>
    {children}
  </EditorContextProvider>;
};