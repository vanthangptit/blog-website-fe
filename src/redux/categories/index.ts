import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_CATEGORY } from '@constants/apis';
import api from '@src/infra/apis';
import { AxiosRequestConfig } from 'axios';

// interface IFUserState {}

const initialState: any = {};

export const getCategoriesApi = createAsyncThunk<any, { config: AxiosRequestConfig }>(API_CATEGORY.ACTION_TYPES.GET, async ({ config }, thunkAPI) => {
  try {
    const response = await api.getCategoriesApi({ config });
    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});


export const appCategoriesSlice = createSlice({
  name: 'appCategory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategoriesApi.fulfilled, (state, action: PayloadAction<any>) => {
        // eslint-disable-next-line no-console
        console.log(action.payload);
      })
      .addCase(getCategoriesApi.rejected, (state, action: PayloadAction<any>) => {
        // eslint-disable-next-line no-console
        console.log(action.payload);
      });
  }
});
