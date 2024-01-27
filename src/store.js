import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import { boardNameReducer } from "./reducer/boardNameReducer"
import { cardsNameReducer } from "./reducer/cardsNameReducer"
import { listsNameReducer } from "./reducer/listsNameReducer"
import { accountsListReducer } from "./reducer/accountsReducer"
import { commentReducer } from "./reducer/commentReducer"
import { internetReducer } from "./reducer/internetReducer"

const reducer = combineReducers({
  boardName: boardNameReducer,
  listsName: listsNameReducer,
  cardsName: cardsNameReducer,
  accountsList: accountsListReducer,
  comment: commentReducer,
  online: internetReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store
