import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER } from '@constants/apis';

// interface IFUserState {}

const initialState: any = {};

export const getProfile = createAsyncThunk<any, { id: string }>(USER.ACTION_TYPES.PROFILE, async (params, thunkAPI) => {
  try {
    const response: any = true;
    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const appUsersSlice = createSlice({
  name: 'appUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<any>) => {
        // eslint-disable-next-line no-console
        console.log(action.payload);
        return action.payload;
      })
      .addCase(getProfile.rejected, (state, action: PayloadAction<any>) => {
        // eslint-disable-next-line no-console
        console.log(action);
        return action.payload;
      });
  }
});

export default appUsersSlice.actions;
