import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import { boardNameReducer } from "./reducer/boardNameReducer"
import { cardsNameReducer } from "./reducer/cardsNameReducer"
import { listsNameReducer } from "./reducer/listsNameReducer"
import { accountsListReducer } from "./reducer/accountsReducer"
import { listReducer } from "./reducer/listReducer"

const reducer = combineReducers({
  boardName: boardNameReducer,
  listsName: listsNameReducer,
  cardsName: cardsNameReducer,
  accountsList: accountsListReducer,
  list: listReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store
