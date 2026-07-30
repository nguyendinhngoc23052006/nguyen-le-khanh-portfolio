import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './i18n'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App locale="vi" />} />
        <Route path="/en" element={<App locale="en" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
