import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';

import { appUsersSlice } from './user';
import { appAuthSlice } from './auth';
import { appCategoriesSlice } from './categories';
import { appPostSlice } from './post';

const reducers = combineReducers({
  user: appUsersSlice.reducer,
  auth: appAuthSlice.reducer,
  categories: appCategoriesSlice.reducer,
  posts: appPostSlice.reducer
});

export const store = configureStore({
  reducer: reducers,
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
