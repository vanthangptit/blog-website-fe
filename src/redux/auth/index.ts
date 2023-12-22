import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOGIN } from '@constants/apis';
import { IFLogin, IFLoginResponse } from '@models/IFAuthenticated';
import api from '@src/infra/apis';
import { Roles } from '@models/IFUser';

interface IFAuthState {
  accessToken?: string
  user?: {
    roles: Roles,
    fullName: string
  }
}

const initialState: IFAuthState = {
  accessToken: undefined,
  user: undefined
};

export const loginApi = createAsyncThunk<any, IFLogin>(LOGIN.ACTION_TYPES, async (params, thunkAPI) => {
  try {
    const response: IFLoginResponse = await api.loginApi(params);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const appAuthSlice = createSlice({
  name: 'appAuth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginApi.fulfilled, (state, action: PayloadAction<any>) => {
        state.accessToken = action.payload?.accessToken;
        state.user = action.payload?.user;
      });
  }
});
