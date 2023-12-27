import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_CATEGORY } from '@constants/apis';
import api from '@src/infra/apis';
import {
  IFCategories,
  IFCategoryId,
  IFGetCategory,
  IFResponseCategory,
  IFResponseCategories
} from '@models/IFCategory';

interface IFUserState {
  isLoading: boolean
  categories?: IFResponseCategories
  singleCategory?: IFResponseCategory
}

const initialState: IFUserState = {
  isLoading: false
};

export const getCategoriesApi = createAsyncThunk<any, IFGetCategory>(API_CATEGORY.ACTION_TYPES.GET, async (params, thunkAPI) => {
  try {
    const response: IFResponseCategories = await api.getCategoriesApi(params);
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

export const editCategory = createAsyncThunk<any, IFCategories>(API_CATEGORY.ACTION_TYPES.PUT, async (params, thunkAPI) => {
  try {
    const response: IFResponseCategory = await api.editCategoryApi(params);
    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const getCategoryById = createAsyncThunk<any, IFCategoryId>(API_CATEGORY.ACTION_TYPES.GET_ID, async (params, thunkAPI) => {
  try {
    const response: IFResponseCategory = await api.getCategoryById(params);

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
