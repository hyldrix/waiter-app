import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { getTableById, updateTableRequest } from '../../../redux/tablesRedux.js';
import { useSelector } from 'react-redux';
import PageTitle from '../../common/PageTitle.js';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const TableForm = () => {
    console.log('mounted')
    let { tableId } = useParams();
    tableId = parseInt(tableId);
    const tableData = useSelector(state => getTableById(state, tableId));

    const dispatch = useDispatch();
    const navigate = useNavigate()


    const [tableStatus, setTableStatus] = useState(tableData.status);
    const [guestAmount, setGuestAmount] = useState(tableData.peopleAmount);
    const [maxGuestAmount, setMaxGuestAmount] = useState(tableData.maxPeopleAmount);
    const [currentBillAmount, setCurrentBillAmount] = useState(tableData.bill);


    const handleUpdate = (e) => {
        e.preventDefault();
        const changedTableData = {
            id: tableId,
            status: tableStatus,
            peopleAmount: Number(guestAmount),
            maxPeopleAmount: Number(maxGuestAmount),
            bill: Number(currentBillAmount)
        }
        dispatch(updateTableRequest(changedTableData, tableId))
        navigate('/')
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

        if (value < 0 || isNaN(value)) {
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

        if (value < 0 || isNaN(value)) {
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
                                    <Form.Select value={tableStatus} onChange={(e) => handleStatusChange(e.target.value)}>
                                        <option value="Busy">Busy</option>
                                        <option value="Reserved">Reserved</option>
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

                                                <Form.Control onChange={e => handleGuests(e.target.value)}
                                                    value={guestAmount}
                                                    type='text'
                                                />
                                            </Form>

                                        </div>

                                        <div className="col-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {' / '}
                                        </div>

                                        <div className="col-1">
                                            <Form.Control type='text'
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
                                            <Form.Control type='text'
                                                value={currentBillAmount}
                                                onChange={e => billHandler(e.target.value)} />

                                        </div>

                                    </InputGroup>

                                </div>

                            </Row>
                            <Row>
                                <Button variant="primary" onClick={e => handleUpdate(e)}>Update</Button>
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
                                    <strong className='col-2 status'>Status: </strong>
                                    <div className="col-4">
                                        <Form.Select value={tableStatus} onChange={(e) => handleStatusChange(e.target.value)}>
                                            <option value="Busy">Busy</option>
                                            <option value="Reserved">Reserved</option>
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

                                                    <Form.Control onChange={e => handleGuests(e.target.value)}
                                                        value={guestAmount}
                                                        type='text'
                                                    />
                                                </Form>

                                            </div>

                                            <div className="col-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                {' / '}
                                            </div>

                                            <div className="col-1">
                                                <Form.Control type='text'
                                                    value={maxGuestAmount}
                                                    onChange={e => {
                                                        handleMaxGuests(e.target.value);
                                                    }
                                                    } />
                                            </div>
                                        </InputGroup>
                                    </div>

                                </Row>
                                <Row>
                                    <Button variant="primary" onClick={e => handleUpdate(e)}>Update</Button>
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