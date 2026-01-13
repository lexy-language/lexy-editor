import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import reportWebVitals from "./reportWebVitals";
import {HashRouter} from 'react-router-dom';
import {createRoot} from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <HashRouter basename={process.env.REACT_APP_BASE_ROUTE}>
      <App />
    </HashRouter>
  </ThemeProvider>
);

reportWebVitals();
