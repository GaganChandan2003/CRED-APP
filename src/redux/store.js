import {legacy_createStore,applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import { reducer as AuthReducer } from './AuthReducer/reducer';
import { reducer as AppReducer } from './AppReducer/reducer';



const rootReducer=combineReducers
({
    auth:AuthReducer,
     app:AppReducer
});


export const store =legacy_createStore(rootReducer,applyMiddleware(thunk));