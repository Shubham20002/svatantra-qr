import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

if (window.location.hostname === 'svatantra-qr-h4yn.vercel.app') {
  window.location.replace(
    window.location.href.replace('https://svatantra-qr-h4yn.vercel.app', 'https://qr.svatantr.in')
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
