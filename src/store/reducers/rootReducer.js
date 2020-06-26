import {combineReducers} from 'redux'
import authReducer from './auth'
import recipesReducer from './recipes'

export default combineReducers({
    auth: authReducer,
    recipes: recipesReducer
})