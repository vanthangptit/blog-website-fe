// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { api } from '@src/apis';

// import { USER } from '@src/constants';

// interface IFUserState {}

const initialState: any = {};

export const getUserApi = createAsyncThunk<any>('USER.ACTION_TYPES.GET_USER', async (_, thunkAPI) => {
  try {
    return true;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});


export const appUsersSlice = createSlice({
  name: 'appUser',
  initialState,
  reducers: {}
  // extraReducers: builder => {}
});
