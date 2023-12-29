import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './SecondTable.jsx'
import SecondTable from './SecondTable.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />

    <SecondTable />
  </React.StrictMode>
)
