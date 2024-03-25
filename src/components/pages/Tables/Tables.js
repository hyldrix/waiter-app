import PageTitle from '../../common/PageTitle.js';

import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import SingleTableRow from '../../views/SingleTableRow/SingleTableRow.js';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux.js';
import Spinner from 'react-bootstrap/Spinner';

import styles from './Tables.module.scss';

const Tables = () => {

  const tables = useSelector(getAllTables);

  if (!tables.length) {
    return <div className={styles.spinner}>
      <Spinner />
    </div>;
  }

  return (
    < >
      <Container>
        <Card>
          <Card.Body>
            <PageTitle>All tables</PageTitle>
            {tables.map((table) => (<SingleTableRow key={table.id} {...table} />))}
          </Card.Body>
        </Card>
      </Container>

    </>
  )
}

export default Tables;