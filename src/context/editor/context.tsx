import createContext from "../createContext"
import React, {useState} from 'react';
import {LayoutState} from "./layoutState";
import {ComponentProps} from "../../infrastructure/componentProps";
import {nothing, Nothing} from "../../infrastructure/nothing";

export type EditorPosition = {
  lineNumber: number;
  column: number;
  source: string;
}

export interface EditorContextState {

  editorPosition: EditorPosition | null;
  setEditorPosition: React.Dispatch<React.SetStateAction<EditorPosition | Nothing>>;

  layout: LayoutState;
  setLayout: React.Dispatch<React.SetStateAction<LayoutState>>;
}

export const [useEditorContext, Provider] = createContext<EditorContextState>();

export const EditorContextProvider = ({children}: ComponentProps) => {

  const [editorPosition, setEditorPosition] = useState<EditorPosition | Nothing>(nothing);
  const [layout, setLayout] = useState(LayoutState.defaultState());

  const state = {
    editorPosition, setEditorPosition,
    layout, setLayout,
  };

  return (
    <Provider value={state}>
      {children}
    </Provider>
  );
};
