import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import {Routes, Route, Navigate} from 'react-router-dom'
import NewNote from './components/NewNote'

function App() {
  return (
    <Container className="my-4">
      <Routes>
          <Route path="/" element={<h1>Home</h1>}/>
          <Route path="/new" element={<h1>New</h1>}/>
          <Route path="/:id">
            <Route index element={<NewNote />} />
            <Route path="edit" element={<h1>Edit Note</h1>} />
          </Route>
          <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Container>
     
  )
}

export default App
