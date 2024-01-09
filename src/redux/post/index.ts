import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POST } from '@constants/apis';
import api from '@src/infra/apis';
import {
  IFCreatePostRequest,
  IFResponseCreatePost,
  IFEditPostRequest,
  IFSinglePostRequest,
  IFResponseSinglePost,
  IFResponseAllPost,
  IFDeletePostRequest
} from '@models/IFPosts';

interface IFPostState {
  isLoading: boolean
  singlePost?: IFResponseSinglePost,
  allPost?: IFResponseAllPost,
}

const initialState: IFPostState = {
  isLoading: false
};

export const createPostApi = createAsyncThunk<any, IFCreatePostRequest>(POST.ACTION_TYPES.POST, async (params, thunkAPI) => {
  try {
    const response: IFResponseCreatePost = await api.createPostApi(params);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const editPostApi = createAsyncThunk<any, IFEditPostRequest>(POST.ACTION_TYPES.PUT, async (params, thunkAPI) => {
  try {
    const response: IFResponseCreatePost = await api.editPostApi(params);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const getSinglePostApi = createAsyncThunk<any, IFSinglePostRequest>(POST.ACTION_TYPES.SINGLE, async (params, thunkAPI) => {
  try {
    const response: IFResponseSinglePost = await api.getSinglePostApi(params);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const getAllPost = createAsyncThunk<any>(POST.ACTION_TYPES.ALL, async (_, thunkAPI) => {
  try {
    const response: IFResponseAllPost = await api.getAllPostApi();

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const deletePost = createAsyncThunk<any, IFDeletePostRequest>(POST.ACTION_TYPES.DELETE, async ({ id }, thunkAPI) => {
  try {
    const response: IFResponseAllPost = await api.deletePostApi(id);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const appPostSlice = createSlice({
  name: 'appPost',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSinglePostApi.fulfilled, (state, action: PayloadAction<any>) => {
        state.singlePost = action.payload;
        state.isLoading = false;
      })
      .addCase(getSinglePostApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPost.fulfilled, (state, action: PayloadAction<any>) => {
        state.allPost = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllPost.pending, (state) => {
        state.isLoading = true;
      });
  }
});
