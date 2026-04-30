import React, {lazy, Suspense, useEffect} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

import EditorBar from "./pages/main/EditorBar";
import FilePage from "./pages/files/FilePage";
import FileExamples from "./pages/files/FileExamples";
import FileNew from "./pages/files/FileNew";
import FileOpen from "./pages/files/FileOpen";
import {Contexts} from "./context/Contexts";
import LoadingPage from "./pages/LoadingPage";
import {hideResizeObserverLoopErrors} from "./pages/main/HideResizeObserverLoopErrors";
import OnlyDesktopModal from "./editor/onlyDesktopModal/OnlyDesktopModal";
import {styled} from "@mui/material"

const EditorPage = lazy(() => import('./pages/editor/EditorPage'));

const Container = styled("div")`
  height: 100vh;
  background: #EEE;
`;

function App() {

  useEffect(hideResizeObserverLoopErrors);

  function withLoader(content: JSX.Element) {
    return <Suspense fallback={<LoadingPage />}>
      {content}
    </Suspense>
  }

  return (
    <Container>
      <Contexts>
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
      </Contexts>
      <OnlyDesktopModal />
    </Container>
  );
}

export default App;
