import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { FormProvider } from './contexts/FormContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <FormProvider>
    <App />
    </FormProvider>
  </StrictMode>,
)
