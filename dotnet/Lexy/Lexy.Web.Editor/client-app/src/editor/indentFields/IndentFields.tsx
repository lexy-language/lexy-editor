import React from 'react';
import {styled} from "@mui/material/styles";
import Stack from "@mui/material/Stack";
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
  margin-bottom: 24px;
`;

const FullWidthStack = styled(Stack)`
  width: 100%;
`;

type IndentFieldsProps = {
  name: string;
  title?: boolean;
  children: React.ReactNode;
}

export default function IndentFields(props: IndentFieldsProps) {

  const {name, title = false, children} = props;

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
