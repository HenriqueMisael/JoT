import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CssVarsProvider } from '@mui/joy'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { useLanguageStore } from './store'

// Initialize language from Zustand state
const { language } = useLanguageStore.getState();
i18n.changeLanguage(language);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <CssVarsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CssVarsProvider>
    </I18nextProvider>
  </StrictMode>,
)
