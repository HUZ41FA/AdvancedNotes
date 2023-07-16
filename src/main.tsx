import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

export type Note = {
  id : string,
  title : string,
  markdown : string,
  tags : Tag[]
}

export type NoteData = {
  title : string,
  markdown : string,
  tags : Tag[]
}

export type Tag = {
  id : string,
  name : string
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
