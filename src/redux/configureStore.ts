import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import { appUsersSlice } from './user';
import { appAuthSlice } from './auth';
import { appCategoriesSlice } from './categories';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [ 'auth' ]
};

const reducers = combineReducers({
  user: appUsersSlice.reducer,
  auth: appAuthSlice.reducer,
  categories: appCategoriesSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      thunk: true,
      serializableCheck: false
    });
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
