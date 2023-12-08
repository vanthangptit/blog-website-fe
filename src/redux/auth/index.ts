import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOGIN, REFRESH_TOKEN } from '@constants/apis';
import { IFLogin, ILoginResponse } from '@models/IFAuth';
import api from '@src/infra/apis';

interface IFUserState {
  loading: boolean
  errorMessage?: string
  accessToken?: string
}

const initialState: IFUserState = {
  loading: false
};

export const loginApi = createAsyncThunk<any, IFLogin>(LOGIN.ACTION_TYPES, async (params, thunkAPI) => {
  try {
    const response: ILoginResponse = await api.loginApi(params);

    // eslint-disable-next-line no-console
    console.log(1111, response);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const getAccessTokenApi = createAsyncThunk<any>(REFRESH_TOKEN.ACTION_TYPES, async (_, thunkAPI) => {
  try {
    const response: ILoginResponse = await api.getAccessToken();

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const appAuthSlice = createSlice({
  name: 'appLogin',
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
      });
  }
});

export default appAuthSlice.actions;
