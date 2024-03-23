// selectors
export const getAllTables = (state) => state.tables;

// actions

const createActionName = actionName => `app/tables/${actionName}`;
const LOAD_TABLES = createActionName('LOAD_TABLES');

// action creators 

export const loadTables = payload => ({ type: LOAD_TABLES, payload })

export const fetchTables = () => {
    return (dispatch) => {
        fetch('http://localhost:3131/api/tables')
            .then(res => res.json())
            .then(tables => dispatch(loadTables(tables)))
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