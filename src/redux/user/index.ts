import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER } from '@constants/apis';
import requester from '@infra/../../services/apis/requester';
import {
  IFProfileParams,
  IFProfileResponse,
  IFEditFirstNameRequest,
  IFEditLastNameRequest,
  IFEditAddressRequest,
  IFEditJobRequest,
  IFEditDescriptionRequest,
  IFEditGenderRequest,
  IFEditBirthDayRequest,
  IFChangePasswordRequest,
  IFProfilePhotoRequest,
  IFFollowingRequest,
  IFUnFollowerRequest,
  IFEditSchoolRequest,
  IFEditAliasRequest,
  IFEditBioRequest,
  IFEditWebsiteUrlRequest
} from '@models/IFUser';
import { IFResponse } from '@models/IFResponse';

interface IFUserState {
  isLoading: boolean
  profile?: IFProfileResponse
}

const initialState: IFUserState = {
  isLoading: false
};

/**
 * @todo: Handling error when server is down
 */

export const getProfile = createAsyncThunk<any, IFProfileParams>(USER.ACTION_TYPES.PROFILE, async ({ token }, thunkAPI) => {
  try {
    const response: IFProfileResponse = await requester.get(USER.URL_API.PROFILE, {}, true, token);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const editFirstName = createAsyncThunk<any, IFEditFirstNameRequest>(USER.ACTION_TYPES.EDIT_FIRST_NAME, async ({ token, data }, thunkAPI) => {
  try {
    const response: IFResponse = await requester.patch(USER.URL_API.EDIT_FIRST_NAME, data, true, token);
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

export const editLastName = createAsyncThunk<any, IFEditLastNameRequest>(USER.ACTION_TYPES.EDIT_LAST_NAME, async ({ token, data }, thunkAPI) => {
  try {
    const response: IFResponse = await requester.patch(USER.URL_API.EDIT_LAST_NAME, data, true, token);
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

export const editUserAddress = createAsyncThunk<any, IFEditAddressRequest>(USER.ACTION_TYPES.EDIT_ADDRESS, async ({ token, data }, thunkAPI) => {
  try {
    const response: IFResponse = await requester.patch(USER.URL_API.EDIT_ADDRESS, data, true, token);
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

export const editUserJob = createAsyncThunk<any, IFEditJobRequest>(USER.ACTION_TYPES.EDIT_JOB, async ({ token, data }, thunkAPI) => {
  try {
    const response: IFResponse = await requester.patch(USER.URL_API.EDIT_JOB, data, true, token);
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

export const editUserDescription = createAsyncThunk<any, IFEditDescriptionRequest>(USER.ACTION_TYPES.EDIT_DESCRIPTION, async ({ token, data }, thunkAPI) => {
  try {
    const response: IFResponse = await requester.patch(USER.URL_API.EDIT_DESCRIPTION, data, true, token);
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

export const editUserGender = createAsyncThunk<any, IFEditGenderRequest>(USER.ACTION_TYPES.EDIT_GENDER, async ({ token, data }, thunkAPI) => {
  try {
    const response: IFResponse = await requester.patch(USER.URL_API.EDIT_GENDER, data, true, token);
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

export const editUserBirthDay = createAsyncThunk<any, IFEditBirthDayRequest>(USER.ACTION_TYPES.EDIT_BIRTHDAY, async ({ token, data }, thunkAPI) => {
  try {
    const response: IFResponse = await requester.patch(USER.URL_API.EDIT_BIRTHDAY, data, true, token);
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

export const changePasswords = createAsyncThunk<any, IFChangePasswordRequest>(USER.ACTION_TYPES.CHANGE_PASSWORDS, async ({ token, data }, thunkAPI) => {
  try {
    const response: IFResponse = await requester.patch(USER.URL_API.CHANGE_PASSWORDS, data, true, token);
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

export const changeProfilePhoto = createAsyncThunk<any, IFProfilePhotoRequest>(USER.ACTION_TYPES.CHANGE_PROFILE_PHOTO, async ({ token, data }, thunkAPI) => {
  try {
    const response: IFResponse = await requester.patch(USER.URL_API.CHANGE_PROFILE_PHOTO, data, true, token);
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

export const editUserSchool = createAsyncThunk<any, IFEditSchoolRequest>(USER.ACTION_TYPES.SCHOOL, async ({ token, data }, thunkAPI) => {
  try {
    const response: IFResponse = await requester.patch(USER.URL_API.SCHOOL, data, true, token);
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

export const editUserAlias = createAsyncThunk<any, IFEditAliasRequest>(USER.ACTION_TYPES.ALIAS, async ({ token, data }, thunkAPI) => {
  try {
    const response: IFResponse = await requester.patch(USER.URL_API.ALIAS, data, true, token);
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

export const editUserBio = createAsyncThunk<any, IFEditBioRequest>(USER.ACTION_TYPES.BIO, async ({ token, data }, thunkAPI) => {
  try {
    const response: IFResponse = await requester.patch(USER.URL_API.BIO, data, true, token);
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

export const editUserWebsiteUrl = createAsyncThunk<any, IFEditWebsiteUrlRequest>(USER.ACTION_TYPES.WEBSITE_URL, async ({ token, data }, thunkAPI) => {
  try {
    const response: IFResponse = await requester.patch(USER.URL_API.WEBSITE_URL, data, true, token);
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

export const followingApi = createAsyncThunk<any, IFFollowingRequest>(USER.ACTION_TYPES.FOLLOWING, async ({ token, params }, thunkAPI) => {
  try {
    const response: IFResponse = await requester.post(`${USER.URL_API.FOLLOWING}/${params.userId}`, {}, true, token);
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

export const unFollowApi = createAsyncThunk<any, IFUnFollowerRequest>(USER.ACTION_TYPES.UN_FOLLOW, async ({ token, params }, thunkAPI) => {
  try {
    const response: IFResponse = await requester.post(`${USER.URL_API.UN_FOLLOW}/${params.userId}`, {}, true, token);
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

export const appUsersSlice = createSlice({
  name: 'appUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.profile = action.payload;
      });
  }
});

export default appUsersSlice.actions;
