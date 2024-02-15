import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';

import { appUsersSlice } from './user';
import { appPostSlice } from './post';
import { appCommentSlice } from './comment';

const reducers = combineReducers({
  user: appUsersSlice.reducer,
  posts: appPostSlice.reducer,
  comment: appCommentSlice.reducer
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
