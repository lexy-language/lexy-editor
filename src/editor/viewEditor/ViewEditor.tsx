import React from 'react';
import Markdown from 'react-markdown'
import {useContext} from "../../context/editorContext";
import {CircularProgress} from "@mui/material";
import {isLoading} from "../../context/loading";
import remarkGfm from 'remark-gfm';
import {styled} from "@mui/material/styles";

const Outer = styled('div')`
  padding: 4px 12px 8px 4px;
`;

export default function ViewEditor() {
  const {
    currentFileCode,
  } = useContext();

  if (isLoading(currentFileCode)) {
    return <CircularProgress size={200} />;
  }

  return <Outer>
    <Markdown className='markdown-body' remarkPlugins={[remarkGfm]}>{currentFileCode?.code}</Markdown>
  </Outer>
}