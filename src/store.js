import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage';
import userReducer from './Slices/UserSlice';
import sidebarReducer from "./Slices/SidebarSlice"

const reducers = combineReducers({
    user: userReducer,
    sidebar: sidebarReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, logger]
})
export const persistor = persistStore(store);
