import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './i18n'
import './index.css'

const locale = window.location.pathname.startsWith('/en') ? 'en' : 'vi'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App locale={locale} />
  </React.StrictMode>,
)
