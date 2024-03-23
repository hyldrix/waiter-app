import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home.js'
const App = () => {
  return (
    <div>
      <Container>
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
        </Routes>

      </Container>
    </div>
  )
};

export default App;