import Vue from 'vue'

import { createStore, applyMiddleware} from 'redux'
import reducers from './reducers/index'
import {createLogger} from 'redux-logger'

const createStoreWithMiddleware = applyMiddleware(
    // createLogger()
)

import * as actions from './actions/todos'

const store = createStore(reducers ,createStoreWithMiddleware)

// if(typeof __DEV__ !== 'undefined' && __DEV__) {
//     windows.store = store
// }

export default store