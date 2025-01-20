import React, {lazy, Suspense, useEffect} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

import EditorBar from "./mainPage/EditorBar";
import FilePage from "./files/FilePage";
import FileExamples from "./files/FileExamples";
import FileNew from "./files/FileNew";
import FileOpen from "./files/FileOpen";
import {EditorContextProvider} from "./context/editorContext";
import LoadingPage from "./pages/LoadingPage";
import {hideResizeObserverLoopErrors} from "./mainPage/HideResizeObserverLoopErrors";

const EditorPage = lazy(() => import('./editor/editorPage/EditorPage'));

function App() {

  useEffect(hideResizeObserverLoopErrors);

  function withLoader(content: JSX.Element) {
    return <Suspense fallback={<LoadingPage />}>
      {content}
    </Suspense>
  }

  return (
    <div style={{ height: '100vh', background: '#EEE' }}>
      <EditorContextProvider>
        <EditorBar />
        <Routes>
          <Route path='/' element={<Navigate to="/editor" />}/>
          <Route path='/file' element={<FilePage/>}>
            <Route path="examples" element={<FileExamples />}/>
            <Route path="new" element={<FileNew />}/>
            <Route path="open" element={<FileOpen />}/>
          </Route>
          <Route path='/editor' element={withLoader(<EditorPage/>)}/>
        </Routes>
      </EditorContextProvider>
    </div>
  );
}

export default App;
