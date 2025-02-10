import React, {useEffect} from 'react';
import Markdown from 'react-markdown'
import {useContext} from "../../context/editorContext";
import {CircularProgress} from "@mui/material";
import {isLoading} from "../../context/loading";
import remarkGfm from 'remark-gfm';
import {styled} from "@mui/material/styles";
import {Link} from "react-router-dom";

const Outer = styled('div')`
  padding: 4px 12px 8px 4px;
`;

const preFix = 'https://github.com/lexy-language/lexy-language/blob/main/';

export default function ViewEditor() {

  const {
    setCurrentFile
  } = useContext();

  function navigateLink(url: string) {
    const identifier = `Lexy|${url.substring(preFix.length).replaceAll("/", "|")}`;
    console.log(identifier);
    setCurrentFile({
      name: identifier,
      identifier: identifier
    });
  }

  const {
    currentFileCode,
  } = useContext();

  const components={
    a: (props: any) => {
      return props.href.startsWith(preFix)
        ? <a href="#" onClick={() => navigateLink(props.href)}>{props.children}</a>
        : <a href={props.href}>{props.children}</a>
    }
  };

  useEffect(() => {
    const body = document.querySelector('.markdown-body') as any;
    console.log("scrollIntoViewscrollIntoViewscrollIntoView")
    body?.scrollIntoView({
      behavior: 'smooth'
    }, 200)
  }, [currentFileCode]);


  if (isLoading(currentFileCode)) {
    return <CircularProgress size={200} />;
  }

  return <Outer>
    <Markdown className='markdown-body' components={components} remarkPlugins={[remarkGfm]}>{currentFileCode?.code}</Markdown>
  </Outer>
}