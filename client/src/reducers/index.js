import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { filterReducer } from './filterReducer'
import { drawerReducer } from './drawerReducer'

const rootReducer = combineReducers({
  user: userReducer,
  filterApplied: filterReducer,
  drawer: drawerReducer,
})

export default rootReducer
