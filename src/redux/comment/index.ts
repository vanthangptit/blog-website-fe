import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { COMMENT } from '@constants/apis';
import {
  IFParamsCommentRequest,
  IFDataCommentRequest,
  IFResponseComment
} from '@models/IFComment';
import requester from '@services/apis/requester';

interface IFPostState {
  isLoading: boolean
  comment?: IFResponseComment
}

const initialState: IFPostState = {
  isLoading: false
};

export const getCommentByPostId = createAsyncThunk<any, IFParamsCommentRequest>(COMMENT.ACTION_TYPES.GET_BY_POST_ID, async ({ params, token }, thunkAPI) => {
  try {
    const response: IFResponseComment = await requester.get(`${COMMENT.URL_API}/${params.id}`, {}, true, token);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const createComment = createAsyncThunk<any, IFDataCommentRequest>(COMMENT.ACTION_TYPES.POST, async ({ params, data, token }, thunkAPI) => {
  try {
    const response: IFResponseComment = await requester.post(`${COMMENT.URL_API}/${params.id}`, data, true, token);
    if (response.status === 200 || response.statusCode === 200) {
      await thunkAPI.dispatch(getCommentByPostId({ params, token }));
    }

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const editComment = createAsyncThunk<any, IFDataCommentRequest>(COMMENT.ACTION_TYPES.PUT, async ({ params, data, token }, thunkAPI) => {
  try {
    const response: IFResponseComment = await requester.put(`${COMMENT.URL_API}/${params.id}`, data, true, token);
    if (response.status === 200 || response.statusCode === 200) {
      await thunkAPI.dispatch(getCommentByPostId({ params, token }));
    }

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const deleteComment = createAsyncThunk<any, IFParamsCommentRequest>(COMMENT.ACTION_TYPES.DELETE, async ({ params, token }, thunkAPI) => {
  try {
    const response: IFResponseComment = await requester.delete(`${COMMENT.URL_API}/${params.id}`, {}, true, token);
    if (response.status === 200 || response.statusCode === 200) {
      await thunkAPI.dispatch(getCommentByPostId({ params, token }));
    }

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const appCommentSlice = createSlice({
  name: 'appComment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCommentByPostId.fulfilled, (state, action: PayloadAction<any>) => {
        state.comment = action.payload;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editComment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editComment.pending, (state) => {
        state.isLoading = true;
      });
  }
});
