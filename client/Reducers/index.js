import {combineReducers} from 'redux';

import noteReducer from './noteReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
    notesList:noteReducer,
    loadingReducer:loadingReducer
})

export default rootReducer;