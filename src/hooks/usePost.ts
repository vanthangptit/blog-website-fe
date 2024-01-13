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
  IFParamsIdRequest
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

  const toggleLikePosts = (params: IFParamsIdRequest) => {
    return dispatch(postStore.toggleLikePostsApi({ params, token: getAuth('accessToken') }));
  };

  const toggleDislikePosts = (params: IFParamsIdRequest) => {
    return dispatch(postStore.toggleDislikePostsApi({ params, token: getAuth('accessToken') }));
  };

  return {
    ...postsStates,
    createPostApi,
    editPostApi,
    getSinglePostApi,
    getAllPost,
    deletePost,
    getPostsByUser,
    toggleLikePosts,
    toggleDislikePosts
  };
};
