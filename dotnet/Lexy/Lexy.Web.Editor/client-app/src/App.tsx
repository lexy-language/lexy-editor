import React, {useEffect} from 'react';
import { Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom';

import EditorBar from "./EditorBar";
import FilePage from "./pages/FilePage";
import FileExamples from "./pages/FileExamples";
import FileNew from "./pages/FileNew";
import FileOpen from "./pages/FileOpen";
import HomePage from "./pages/HomePage";
import { EditorContextProvider } from "./context/editorContext";

const EditorPage = lazy(() => import('./pages/EditorPage'));

function App() {
  useEffect(() => {
    function hideError(e: any) {
      if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        );
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    }

    window.addEventListener('error', hideError)
    return () => {
      window.addEventListener('error', hideError)
    }
  });

  function withLoader(content: JSX.Element) {
    return <Suspense
      fallback={<div>Editor is loading please wait...</div>}
    >
      {content}
    </Suspense>
  }

  return (
    <div style={{ height: '100vh', background: '#EEE' }}>
      <EditorContextProvider>
        <EditorBar />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/file' element={<FilePage/>}>
            <Route path="examples" element={<FileExamples />} />
            <Route path="new" element={<FileNew />} />
            <Route path="open" element={<FileOpen />} />
          </Route>
          <Route path='/editor' element={withLoader(<EditorPage/>)} />
        </Routes>
      </EditorContextProvider>
    </div>
  );
}

export default App;
