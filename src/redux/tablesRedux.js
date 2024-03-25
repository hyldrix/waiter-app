//imports

import { API_URL } from '../config.js';

// selectors
export const getAllTables = (state) => state.tables;
export const getTableById = (state, id) => state.tables.find(table => table.id === id);

// actions

const createActionName = actionName => `app/tables/${actionName}`;
const LOAD_TABLES = createActionName('LOAD_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

// action creators 

export const loadTables = payload => ({ type: LOAD_TABLES, payload })
export const updateTable = payload => ({ type: UPDATE_TABLE, payload })

export const fetchTables = () => {
    return (dispatch) => {
        fetch(`${API_URL}/tables`)
            .then(res => res.json())
            .then(tables => dispatch(loadTables(tables)))
    }
}

export const updateTableRequest = (changedTable, tableId) => {
    return (dispatch) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changedTable)
        }

        fetch(`${API_URL}/tables/tables/${tableId}`, options)
        .then(res => res.json())
        .then(data => dispatch(updateTable(data)))
    }
}

const tablesReducer = (statePart = [], action) => {
    switch (action.type) {
        case LOAD_TABLES:
            return [...action.payload];
        default:
            return statePart;
    };
};

export default tablesReducer;