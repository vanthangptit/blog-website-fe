import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_CATEGORY } from '@constants/apis';
import {
  IFCreateCategory,
  IFEditCategory,
  IFGetCategories,
  IFResponseCategory,
  IFResponseCategories,
  IFDeleteCategory,
  IFGetCategoryById
} from '@models/IFCategory';
import requester from '@infra/apis/requester';

interface IFCategoryState {
  isLoading: boolean
  categories?: IFResponseCategories
  singleCategory?: IFResponseCategory
}

const initialState: IFCategoryState = {
  isLoading: false
};

export const getCategoriesApi = createAsyncThunk<any, IFGetCategories>(API_CATEGORY.ACTION_TYPES.GET, async ({ token }, thunkAPI) => {
  try {
    const response: IFResponseCategories = await requester.get(API_CATEGORY.URL_API, {}, true, token);
    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const createCategory = createAsyncThunk<any, IFCreateCategory>(API_CATEGORY.ACTION_TYPES.POST, async ({ data, token }, thunkAPI) => {
  try {
    const response: IFResponseCategories = await requester.post(API_CATEGORY.URL_API, data, true, token);
    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const editCategory = createAsyncThunk<any, IFEditCategory>(API_CATEGORY.ACTION_TYPES.PUT, async ({ params, data,  token }, thunkAPI) => {
  try {
    const response: IFResponseCategory = await requester.put(`${API_CATEGORY.URL_API}/${params.id}`, data, true, token);
    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const deleteCategory = createAsyncThunk<any, IFDeleteCategory>(API_CATEGORY.ACTION_TYPES.PUT, async ({ params, token }, thunkAPI) => {
  try {
    const response: IFResponseCategory = await requester.delete(`${API_CATEGORY.URL_API}/${params.id}`, {}, true, token);
    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const getCategoryById = createAsyncThunk<any, IFGetCategoryById>(API_CATEGORY.ACTION_TYPES.GET_ID, async ({ params, token }, thunkAPI) => {
  try {
    const response: IFResponseCategory = await requester.get(`${API_CATEGORY.URL_API}/${params.id}`, {}, true, token);

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
        state.categories = action.payload;
      })
      .addCase(getCategoryById.fulfilled, (state, action: PayloadAction<any>) => {
        state.singleCategory = action.payload;
      });
  }
});

export default appCategoriesSlice.actions;
