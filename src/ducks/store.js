import {createStore, combineReducers} from 'redux'
import auth_reducer from './auth_reducer'
import exercise_reducer from './exercise_reducer'

const rootReducer = combineReducers({auth_reducer, exercise_reducer})

export default createStore(rootReducer)