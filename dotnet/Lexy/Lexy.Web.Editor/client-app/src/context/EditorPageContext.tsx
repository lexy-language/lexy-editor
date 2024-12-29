import createContext from "./createContext"
import React, { useState } from 'react';

export enum LeftContainer {
  Explorer,
  Structure
}

export enum MainContainer {
  Source,
  Run,
  Table
}

export enum BottomContainer {
  Logging,
  Testing
}

export type EditorPageState = {
  leftContainer: LeftContainer;
  mainContainer: MainContainer;
  bottomContainer: BottomContainer;
  setLeftContainer: React.Dispatch<React.SetStateAction<LeftContainer>>;
  setMainContainer: React.Dispatch<React.SetStateAction<MainContainer>>;
  setBottomContainer: React.Dispatch<React.SetStateAction<BottomContainer>>;
}

export const [useContext, Provider] = createContext<EditorPageState>();

type ContextProviderProps = {
  children: React.ReactNode;
};

export const EditorPageContextProvider = ({ children }: ContextProviderProps) => {
  const [leftContainer, setLeftContainer] = useState(LeftContainer.Explorer);
  const [mainContainer, setMainContainer] = useState(MainContainer.Source);
  const [bottomContainer, setBottomContainer] = useState(BottomContainer.Logging);
  const value = {
    leftContainer,
    mainContainer,
    bottomContainer,
    setLeftContainer,
    setMainContainer,
    setBottomContainer,
  };

  return <Provider value={value}>{children}</Provider>;
};
