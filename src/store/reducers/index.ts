import { combineReducers } from '@reduxjs/toolkit';

import tableDataReduser from './tableData';

const rootReducer = combineReducers({
    tableData: tableDataReduser
})


export default rootReducer;