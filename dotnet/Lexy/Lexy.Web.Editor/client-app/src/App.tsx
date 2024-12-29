import React from 'react';
import { Route, Routes } from 'react-router-dom';

import EditorBar from "./EditorBar";
import FilePage from "./pages/FilePage";
import FileExamples from "./pages/FileExamples";
import FileNew from "./pages/FileNew";
import FileOpen from "./pages/FileOpen";
import EditorPage from "./pages/EditorPage";
import HomePage from "./pages/HomePage";
import { EditorPageContextProvider } from "./context/EditorPageContext";

function App() {
  return (
    <div style={{ height: '100vh', background: '#EEE' }}>
      <EditorPageContextProvider>
        <EditorBar />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/file' element={<FilePage/>}>
            <Route path="examples" element={<FileExamples />} />
            <Route path="new" element={<FileNew />} />
            <Route path="open" element={<FileOpen />} />
          </Route>
          <Route path='/editor' element={<EditorPage/>} />
        </Routes>
      </EditorPageContextProvider>
    </div>
  );
}

export default App;
