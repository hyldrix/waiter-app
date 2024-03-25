import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Tables from './components/pages/Tables/Tables.js'
import Header from './components/views/Header/Header.js';
import NotFound from './components/pages/NotFound/NotFound.js';
import Footer from './components/views/Footer/Footer.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchTables } from './redux/tablesRedux.js';
import TableForm from './components/views/TableForm/TableForm.js';
const App = () => {

  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchTables()), [dispatch]);


  return (
    <div>

      <Container>
        <Header />
        <Routes>
          <Route exact path='/' element={<Tables />}></Route>
          <Route path="/table/:tableId" element={<TableForm/>} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
        <Footer />
      </Container>
    </div>
  )
};

export default App;