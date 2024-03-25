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
        fetch('http://localhost:3131/api/tables')
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

        fetch(`http://localhost:3131/api/tables/${tableId}`, options)
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