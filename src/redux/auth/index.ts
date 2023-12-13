import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOGIN, REFRESH_TOKEN } from '@constants/apis';
import { IFLogin, ILoginResponse, ITokenResponse } from '@models/IFAuth';
import api from '@src/infra/apis';
import { AxiosRequestConfig } from 'axios';

interface IFUserState {
  loading: boolean
  errorMessage?: string
  accessToken?: string
}

const initialState: IFUserState = {
  loading: false
};

export const loginApi = createAsyncThunk<any, { params: IFLogin, config: AxiosRequestConfig }>(LOGIN.ACTION_TYPES, async ({ params, config }, thunkAPI) => {
  try {
    const response: ILoginResponse = await api.loginApi(params, config);

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
        state.accessToken = action.payload.accessToken;
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
        state.accessToken = action.payload.accessToken;
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
