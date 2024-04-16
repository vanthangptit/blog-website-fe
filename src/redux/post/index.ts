import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POST, TAG } from '@constants/apis';
import {
  IFCreatePostRequest,
  IFResponseCreatePost,
  IFEditPostRequest,
  IFSinglePostRequest,
  IFResponseSinglePost,
  IFResponseAllPost,
  IFDeletePostRequest,
  IFAssociatePostRequest,
  IFSavesRequest,
  IFPinRequest,
  IFResponseAllTags
} from '@models/IFPosts';
import requester from '@infra/../../services/apis/requester';
import { getProfile } from '@store/user';

interface IFPostState {
  isLoading: boolean
  singlePost?: IFResponseSinglePost,
  allPost?: IFResponseAllPost,
  allTag?: IFResponseAllTags,
  postsByUser?: IFResponseAllPost,
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
    const response: IFResponseCreatePost = await requester.put(`${POST.URL_API}/${params.id}`, data, true, token);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const getSinglePostApi = createAsyncThunk<any, IFSinglePostRequest>(POST.ACTION_TYPES.SINGLE, async ({ params, token }, thunkAPI) => {
  try {
    const response: IFResponseSinglePost = await requester.get(`${POST.URL_API}/${params.shortUrl}`);
    if (response.status === 200 || response.statusCode === 200) {
      await thunkAPI.dispatch(getProfile({ token }));
    }

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const getAllPost = createAsyncThunk<any, { token?: string }>(POST.ACTION_TYPES.ALL, async ({ token }, thunkAPI) => {
  try {
    const response: IFResponseAllPost = await requester.get(POST.URL_API, {}, false, token);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const getPostsByUser = createAsyncThunk<any, { token?: string }>(POST.ACTION_TYPES.POSTS_BY_USER, async ({ token }, thunkAPI) => {
  try {
    const response: IFResponseAllPost = await requester.get(`${POST.URL_API}/my-post`, {}, true, token);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const deletePost = createAsyncThunk<any, IFDeletePostRequest>(POST.ACTION_TYPES.DELETE, async ({ params, token }, thunkAPI) => {
  try {
    const response: IFResponseAllPost = await requester.delete(`${POST.URL_API}/${params.id}`, {}, true, token);

    if (response.status === 200 || response.statusCode === 200) {
      await thunkAPI.dispatch(getPostsByUser({ token }));
    }

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const toggleAssociatePosts = createAsyncThunk<any, IFAssociatePostRequest>(POST.ACTION_TYPES.ASSOCIATE, async ({ data, params, token }, thunkAPI) => {
  try {
    const response = await requester.post(`${POST.URL_API}/associates/${params.id}`, data, true, token);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const toggleSavesPost = createAsyncThunk<any, IFSavesRequest>(POST.ACTION_TYPES.SAVES, async ({ params, token }, thunkAPI) => {
  try {
    const response = await requester.post(`${POST.URL_API}/saves/${params.id}`, {}, true, token);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const togglePinPost = createAsyncThunk<any, IFPinRequest>(POST.ACTION_TYPES.PINNED, async ({ params, token }, thunkAPI) => {
  try {
    const response = await requester.post(`${POST.URL_API}/pin/${params.id}`, {}, true, token);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

/**
 * @getAllTags
 */
export const getTags = createAsyncThunk<any, { token?: string }>(TAG.ACTION_TYPES.ALL, async ({ token }, thunkAPI) => {
  try {
    const response: IFResponseAllTags = await requester.get(`${TAG.URL_API}`, {}, true, token);

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
      })
      .addCase(getPostsByUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.postsByUser = action.payload;
      })
      .addCase(getAllPost.fulfilled, (state, action: PayloadAction<any>) => {
        state.allPost = action.payload;
      })
      .addCase(getTags.fulfilled, (state, action: PayloadAction<any>) => {
        state.allTag = action.payload;
      });
  }
});
