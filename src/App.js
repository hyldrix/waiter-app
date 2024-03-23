import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home.js';
import Header from './components/views/Header/Header.js';
import NotFound from './components/pages/NotFound/NotFound.js';
import Footer from './components/views/Footer/Footer.js';

const App = () => {
  return (
    <div>

      <Container>
        <Header />
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          {/*           <Route path="/table/:tableId" element={<SingleTableDetails />} />
 */}          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </div>
  )
};

export default App;