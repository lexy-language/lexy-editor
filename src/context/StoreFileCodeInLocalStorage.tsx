import React, {useEffect} from "react";
import {useContext} from "./editorContext";

type StoreFileCodeInLocalStorageProps = {
  children: React.ReactNode;
};


export default function StoreFileCodeInLocalStorage({children}: StoreFileCodeInLocalStorageProps) {

  return <>{children}</>;
}