import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { COMMENT } from '@constants/apis';
import api from '@src/infra/apis';
import {
  IFParamsCommentRequest,
  IFDataCommentRequest,
  IFResponseComment
} from '@models/IFComment';

interface IFPostState {
  isLoading: boolean
  comment?: IFResponseComment
}

const initialState: IFPostState = {
  isLoading: false
};

export const getCommentByPostId = createAsyncThunk<any, IFParamsCommentRequest>(COMMENT.ACTION_TYPES.GET_BY_POST_ID, async (params, thunkAPI) => {
  try {
    const response: IFResponseComment = await api.getCommentByPostIdApi(params);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const createComment = createAsyncThunk<any, { params: IFParamsCommentRequest, data: IFDataCommentRequest }>(COMMENT.ACTION_TYPES.POST, async ({ params, data }, thunkAPI) => {
  try {
    const response: IFResponseComment = await api.createCommentApi(params, data);
    if (response.status === 200 || response.statusCode === 200) {
      await thunkAPI.dispatch(getCommentByPostId(params));
    }

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const editComment = createAsyncThunk<any, { params: IFParamsCommentRequest, data: IFDataCommentRequest }>(COMMENT.ACTION_TYPES.PUT, async ({ params, data }, thunkAPI) => {
  try {
    const response: IFResponseComment = await api.editCommentApi(params, data);
    if (response.status === 200 || response.statusCode === 200) {
      await thunkAPI.dispatch(getCommentByPostId(params));
    }

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const deleteComment = createAsyncThunk<any, IFParamsCommentRequest>(COMMENT.ACTION_TYPES.DELETE, async (params, thunkAPI) => {
  try {
    const response: IFResponseComment = await api.deleteCommentApi(params);
    if (response.status === 200 || response.statusCode === 200) {
      await thunkAPI.dispatch(getCommentByPostId(params));
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
