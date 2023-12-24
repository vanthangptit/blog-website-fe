import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_CATEGORY } from '@constants/apis';
import api from '@src/infra/apis';
import {
  IFCategories,
  IFGetCategory,
  IFResponseCategories
} from '@models/IFCategory';

interface IFUserState {
  isLoading: boolean
  categories?: IFResponseCategories[]
}

const initialState: IFUserState = {
  isLoading: false
};

export const getCategoriesApi = createAsyncThunk<any, IFGetCategory>(API_CATEGORY.ACTION_TYPES.GET, async (params, thunkAPI) => {
  try {
    const response = await api.getCategoriesApi(params);
    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const createCategory = createAsyncThunk<any, IFCategories>(API_CATEGORY.ACTION_TYPES.POST, async (params, thunkAPI) => {
  try {
    const response = await api.createCategoryApi(params);
    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const appCategoriesSlice = createSlice({
  name: 'appCategory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategoriesApi.fulfilled, (state, action: PayloadAction<any>) => {
        state.categories = action.payload.data;
      });
  }
});

export default appCategoriesSlice.actions;
