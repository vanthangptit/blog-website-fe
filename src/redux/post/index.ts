import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOGIN } from '@constants/apis';
import api from '@src/infra/apis';
import {
  IFCreatePostRequest,
  IFResponseCreatePost,
  IFEditPostRequest,
  IFSinglePostRequest,
  IFResponseSinglePost
} from '@models/IFPosts';

interface IFPostState {
  isLoading: boolean
  singlePost?: IFResponseSinglePost
}

const initialState: IFPostState = {
  isLoading: false
};

export const createPostApi = createAsyncThunk<any, IFCreatePostRequest>(LOGIN.ACTION_TYPES, async (params, thunkAPI) => {
  try {
    const response: IFResponseCreatePost = await api.createPostApi(params);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const editPostApi = createAsyncThunk<any, IFEditPostRequest>(LOGIN.ACTION_TYPES, async (params, thunkAPI) => {
  try {
    const response: IFResponseCreatePost = await api.editPostApi(params);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const getSinglePostApi = createAsyncThunk<any, IFSinglePostRequest>(LOGIN.ACTION_TYPES, async (params, thunkAPI) => {
  try {
    const response: IFResponseSinglePost = await api.getSinglePostApi(params);

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
      });
  }
});
