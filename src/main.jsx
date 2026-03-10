import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './assets/context/AuthContext.jsx'
import { BiodataProvider } from './assets/context/BiodataContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BiodataProvider>
          <App />
        </BiodataProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
