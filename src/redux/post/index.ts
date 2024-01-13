import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POST } from '@constants/apis';
import {
  IFCreatePostRequest,
  IFResponseCreatePost,
  IFEditPostRequest,
  IFSinglePostRequest,
  IFResponseSinglePost,
  IFResponseAllPost,
  IFDeletePostRequest
} from '@models/IFPosts';
import requester from '@infra/apis/requester';

interface IFPostState {
  isLoading: boolean
  singlePost?: IFResponseSinglePost,
  allPost?: IFResponseAllPost,
}

const initialState: IFPostState = {
  isLoading: false
};

export const createPostApi = createAsyncThunk<any, { data: IFCreatePostRequest, token?: string }>(POST.ACTION_TYPES.POST, async ({ data, token }, thunkAPI) => {
  try {
    const response: IFResponseCreatePost = await requester.post(POST.URL_API, data, true, token);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const editPostApi = createAsyncThunk<any, IFEditPostRequest>(POST.ACTION_TYPES.PUT, async ({ params, data, token }, thunkAPI) => {
  try {
    const response: IFResponseCreatePost = await requester.put(`${POST.URL_API}/${params.shortUrl}`, data, true, token);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const getSinglePostApi = createAsyncThunk<any, IFSinglePostRequest>(POST.ACTION_TYPES.SINGLE, async (params, thunkAPI) => {
  try {
    const response: IFResponseSinglePost = await requester.get(`${POST.URL_API}/${params.shortUrl}`);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const getAllPost = createAsyncThunk<any, { token?: string }>(POST.ACTION_TYPES.ALL, async (token, thunkAPI) => {
  try {
    const response: IFResponseAllPost = await requester.get(POST.URL_API);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const deletePost = createAsyncThunk<any, IFDeletePostRequest>(POST.ACTION_TYPES.DELETE, async ({ id, token }, thunkAPI) => {
  try {
    const response: IFResponseAllPost = await requester.delete(`${POST.URL_API}/${id}`, {}, true, token);

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
