import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { getTableById } from '../../../redux/tablesRedux.js';
import { useSelector } from 'react-redux';
import PageTitle from '../../common/PageTitle.js';
import { useParams } from 'react-router-dom';


const TableForm = () => {

    let { tableId } = useParams();
    tableId = parseInt(tableId);
    const tableData = useSelector(state => getTableById(state, tableId));
    console.log(tableData);


    const [tableStatus, setTableStatus] = useState(tableData.status);
    const [guestAmount, setGuestAmount] = useState(tableData.maxPeopleAmount);
    const [maxGuestAmount, setMaxGuestAmount] = useState(tableData.maxPeopleAmount);
    const [currentBillAmount, setCurrentBillAmount] = useState(tableData.bill);


    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleStatusChange = (value) => {
        if (value === 'Busy') {
            setCurrentBillAmount('0');
        }
        if (value === 'Free' || value === 'Cleaning') {
            setGuestAmount('0');
        }
        setTableStatus(value);
    };

    const handleGuests = (value) => {

        if (value < 0 || isNaN(value)) {
            value = '0';
        }
        if (value > Number(maxGuestAmount)) {
            value = maxGuestAmount;
        }
        setGuestAmount(value);
    };

    const handleMaxGuests = (value) => {

        if (Number(value) < 0 || isNaN(value)) {
            value = '0';
        }
        if (value > 10) {
            value = '10';
        }

        setMaxGuestAmount(value);

        if (Number(guestAmount) > value) {
            setGuestAmount(value);
        }

    }

    const billHandler = (value) => {

        if (Number(value) < 0 || isNaN(value)) {
            value = '0';
        }
    

        setCurrentBillAmount(value)

    }


    if (tableStatus === 'Busy') {
        return (<Card>
            <Card.Body>
                <PageTitle>Table {tableData.id}</PageTitle>
                <Card>
                    <Card.Body>
                        <Col>
                            <Row className='pb-3'>
                                <strong className='col-2 status'>Status: </strong>
                                <div className="col-4">
                                    <Form.Select aria-label="Default select example" value={tableStatus} onChange={(e) => handleStatusChange(e.target.value)}>
                                        <option value="Busy">Busy</option>
                                        <option value="Available">Available</option>
                                        <option value="Free">Free</option>
                                        <option value="Cleaning">Cleaning</option>
                                    </Form.Select>
                                </div>


                            </Row>
                            <Row className='pb-3'>
                                <strong className='col-2' size="sm">People: </strong>
                                <div className="col-10">
                                    <InputGroup className="mb-3 guestamounts" >
                                        <div className="col-1">
                                            <Form >

                                                <Form.Control onChange={e => handleGuests(e.target.value)} as='input'
                                                    value={guestAmount}
                                                    type='number'
                                                />
                                            </Form>

                                        </div>

                                        <div className="col-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {' / '}
                                        </div>

                                        <div className="col-1">
                                            <Form.Control as='input' type='number'
                                                value={maxGuestAmount}
                                                onChange={e => {
                                                    handleMaxGuests(e.target.value);
                                                }
                                                } />
                                        </div>
                                    </InputGroup>
                                </div>

                            </Row>

                            <Row className='pb-3 bill'>
                                <strong className='col-2'>Bill: </strong>
                                <div className="col-10">

                                    <InputGroup className="mb-3" >
                                        <InputGroup.Text>
                                            $
                                        </InputGroup.Text>
                                        <div className="col-1">
                                            <Form.Control as='input' type='number'
                                                value={currentBillAmount}
                                                onChange={e => billHandler(e.target.value)} />

                                        </div>

                                    </InputGroup>

                                </div>

                            </Row>
                            <Row>
                                <Button variant="primary" onClick={e => handleSubmit(e)}>Update</Button>
                            </Row>
                        </Col>
                    </Card.Body>
                </Card >
            </Card.Body>
        </Card>

        )
    } else {
        return (
            <Card>
                <Card.Body>
                    <PageTitle>Table {tableData.id}</PageTitle>
                    <Card>
                        <Card.Body>
                            <Col>
                                <Row className='pb-3'>
                                    <strong className='col-2'>Status: </strong>
                                    <div className="col-4">
                                        <Form.Select aria-label="Default select example" defaultValue={tableStatus} onChange={e => setTableStatus(e.target.value)}>
                                            <option value="Busy">Busy</option>
                                            <option value="Available">Available</option>
                                            <option value="Reserved">Reserved</option>
                                            <option value="Cleaning">Cleaning</option>
                                        </Form.Select>
                                    </div>


                                </Row>
                                <Row className='pb-3'>
                                    <strong className='col-2' size="sm">People: </strong>
                                    <div className="col-10">
                                        <InputGroup className="mb-3" >
                                            <div className="col-1">
                                                <Form.Control as='input' type='number'
                                                    defaultValue={guestAmount}
                                                    onChange={
                                                        e => {
                                                            setGuestAmount(e.target.value);
                                                        }} />
                                            </div>

                                            <div className="col-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                {' / '}
                                            </div>

                                            <div className="col-1">
                                                <Form.Control as='input' type='number'
                                                    defaultValue={maxGuestAmount}
                                                    onChange={e => {
                                                        setMaxGuestAmount(e.target.value);
                                                    }
                                                    } />
                                            </div>
                                        </InputGroup>
                                    </div>

                                </Row>
                                <Row>
                                    <Button variant="primary" onClick={e => handleSubmit(e)}>Update</Button>
                                </Row>

                            </Col>
                        </Card.Body>
                    </Card >
                </Card.Body>
            </Card>
        )

    }


}

export default TableForm;