import React from 'react';
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import {TextField} from "@mui/material";
import {useContext} from "../../context/editorContext";
import Typography from "@mui/material/Typography";

const Indent = styled('div')`
  width: 16px;
  border-left: 2px solid #BBB;
`;

const PaddingTop = styled('div')`
  padding-top: 24px;
  width: 100%;
`;

const CustomTypeBox = styled('div')`
  width: 100%;
`;

const FullWidthStack = styled(Stack)`
  width: 100%;
`;

type IndentFields = {
  name: string;
  title?: boolean;
  children: React.ReactNode;
}

export default function IndentFields({
    name,
    title = false,
    children
  }: IndentFields) {
  return <CustomTypeBox key={name}>
    <Typography variant="subtitle1" fontWeight={title ? "bolder" : 'normal'} fontSize={title ? '1.3rem' : '1rem'}>
      {name}
    </Typography>
    <FullWidthStack direction="row">
      <Indent/>
      <PaddingTop>
        {children}
      </PaddingTop>
    </FullWidthStack>
  </CustomTypeBox>
}
