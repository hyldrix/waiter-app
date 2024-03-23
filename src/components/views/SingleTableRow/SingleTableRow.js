
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import styles from './SingleTableRow.module.scss'
import { Link } from 'react-router-dom';

const SingleTableRow = ( {id, status} ) => {

    return (<Row className={styles.singleRow}>

        <Col className='col-3'>
            <h4 className='card-title'>Table {id}</h4>
        </Col>
        <Col className='col-5'>
            <h6 className="card-text"><strong>Status: </strong>{status}</h6>
        </Col>
        <Col className='col-4'>
            <div className='d-flex justify-content-end'>
                <Link to={`/table/${id}`}>
                    <Button className={styles.button} variant="primary">Show more</Button>
                </Link>

            </div>
        </Col>
    </Row>)
}

export default SingleTableRow;