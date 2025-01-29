import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter basename={process.env.REACT_APP_BASE_ROUTE}>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

reportWebVitals();