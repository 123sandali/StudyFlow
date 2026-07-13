import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import AppProviders from './app/providers.jsx';

import './styles/global.css';
import './styles/layout.css';
import './styles/forms.css';
import './styles/router.css';

createRoot(
  document.getElementById('root'),
).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);