import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';
import * as postStore from '@store/post';
import {
  IFCreatePostRequest,
  IFDeletePostRequest,
  IFEditPostRequest,
  IFSinglePostRequest,
  IFParamsIdRequest,
  IFAssociateDataRequest
} from '@models/IFPosts';
import { useAuth } from '@hooks/useAuth';

export const usePosts = () => {
  const dispatch = useAppDispatch();
  const { getAuth } = useAuth();
  const postsStates = useAppSelector((state: RootState) => state.posts);

  const createPostApi = (data: IFCreatePostRequest) => {
    return dispatch(postStore.createPostApi({ data, token: getAuth('accessToken') }));
  };

  const editPostApi = (params: IFEditPostRequest) => {
    return dispatch(postStore.editPostApi({ ...params, token: getAuth('accessToken') }));
  };

  const getSinglePostApi = (params: IFSinglePostRequest) => {
    return dispatch(postStore.getSinglePostApi(params));
  };

  const getPostsByUser = () => {
    return dispatch(postStore.getPostsByUser({ token: getAuth('accessToken') }));
  };

  const getAllPost = () => {
    return dispatch(postStore.getAllPost({ token: getAuth('accessToken') }));
  };

  const deletePost = (params: IFDeletePostRequest) => {
    return dispatch(postStore.deletePost(params));
  };

  const toggleAssociatePost = (params: IFParamsIdRequest, data: IFAssociateDataRequest ) => {
    return dispatch(postStore.toggleAssociatePosts({ data, params, token: getAuth('accessToken') }));
  };

  const toggleSavesPost = (params: IFParamsIdRequest ) => {
    return dispatch(postStore.toggleSavesPost({ params, token: getAuth('accessToken') }));
  };

  return {
    ...postsStates,
    createPostApi,
    editPostApi,
    getSinglePostApi,
    getAllPost,
    deletePost,
    getPostsByUser,
    toggleAssociatePost,
    toggleSavesPost
  };
};
