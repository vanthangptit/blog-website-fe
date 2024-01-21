import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER } from '@constants/apis';
import requester from '@infra/apis/requester';
import {
  IFProfileParams,
  IFProfileResponse,
  IFEditFirstNameRequest, IFEditLastNameRequest
} from '@models/IFUser';

interface IFUserState {
  isLoading: boolean
  profile?: IFProfileResponse
}

const initialState: IFUserState = {
  isLoading: false
};

export const getProfile = createAsyncThunk<any, IFProfileParams>(USER.ACTION_TYPES.PROFILE, async ({ token }, thunkAPI) => {
  try {
    const response: IFProfileResponse = await requester.get(USER.URL_API.PROFILE, {}, true, token);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const editFirstName = createAsyncThunk<any, IFEditFirstNameRequest>(USER.ACTION_TYPES.EDIT_FIRST_NAME, async ({ token, data }, thunkAPI) => {
  try {
    const response: IFProfileResponse = await requester.patch(USER.URL_API.EDIT_FIRST_NAME, data, true, token);
    if (response.status === 200 || response.statusCode === 200) {
      await thunkAPI.dispatch(getProfile({ token }));
    }

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const editLastName = createAsyncThunk<any, IFEditLastNameRequest>(USER.ACTION_TYPES.EDIT_LAST_NAME, async ({ token, data }, thunkAPI) => {
  try {
    const response: IFProfileResponse = await requester.patch(USER.URL_API.EDIT_LAST_NAME, data, true, token);
    if (response.status === 200 || response.statusCode === 200) {
      await thunkAPI.dispatch(getProfile({ token }));
    }

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
        state.profile = action.payload;
      });
  }
});

export default appUsersSlice.actions;
