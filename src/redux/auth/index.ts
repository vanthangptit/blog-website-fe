import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOGIN, REFRESH_TOKEN } from '@constants/apis';
import { IFLogin, IFLoginResponse, ITokenResponse } from '@models/IFAuth';
import api from '@src/infra/apis';
import { AxiosRequestConfig } from 'axios';
import { Roles } from '@models/IFUser';

interface IFAuthState {
  loading: boolean
  errorMessage?: string
  auth?: {
    accessToken: string
    roles: Roles,
    fullName: string
  }
}

const initialState: IFAuthState = {
  loading: false
};

export const loginApi = createAsyncThunk<any, { params: IFLogin, config: AxiosRequestConfig }>(LOGIN.ACTION_TYPES, async ({ params, config }, thunkAPI) => {
  try {
    const response: IFLoginResponse = await api.loginApi(params, config);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const getAccessTokenApi = createAsyncThunk<any, { config: AxiosRequestConfig }>(REFRESH_TOKEN.ACTION_TYPES, async ({ config }, thunkAPI) => {
  try {
    const response: ITokenResponse = await api.getAccessToken({ config });
    // await thunkAPI.dispatch(loginApi());

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
        state.loading = false;
        state.auth = action.payload.auth;
        state.errorMessage = undefined;
      })
      .addCase(loginApi.pending, (state) => {
        state.loading = true;
        state.errorMessage = undefined;
      })
      .addCase(loginApi.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.errorMessage = action.payload?.data?.message;
      })
      .addCase(getAccessTokenApi.fulfilled, (state, action: PayloadAction<any>) => {
        state.auth = action.payload.auth;
      })
      .addCase(getAccessTokenApi.rejected, (state, action: PayloadAction<any>) => {
        // eslint-disable-next-line no-console
        console.log(action.payload);
        /**
         * @todo: Handle logout
         */
      });
  }
});

export default appAuthSlice.actions;
