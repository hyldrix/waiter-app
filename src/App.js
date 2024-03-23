import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home.js';
import NavBar from './components/views/NavBar/NavBar.js';
import NotFound from './components/pages/NotFound/NotFound.js';

const App = () => {
  return (
    <div>
      <NavBar/>
      <Container>
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
{/*           <Route path="/table/:tableId" element={<SingleTableDetails />} />
 */}          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  )
};

export default App;