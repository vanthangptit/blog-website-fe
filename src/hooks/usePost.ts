import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';
import * as postStore from '@store/post';
import {
  IFCreatePostRequest,
  IFEditPostRequest,
  IFAssociateDataRequest,
  IFParamsShortUrl,
  IFParamsId
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

  const getSinglePostApi = (params: IFParamsShortUrl) => {
    return dispatch(postStore.getSinglePostApi({ params, token: getAuth('accessToken') }));
  };

  const getPostsByUser = () => {
    return dispatch(postStore.getPostsByUser({ token: getAuth('accessToken') }));
  };

  const getAllPost = () => {
    return dispatch(postStore.getAllPost({ token: getAuth('accessToken') }));
  };

  const deletePost = (params: IFParamsId) => {
    return dispatch(postStore.deletePost({ params, token: getAuth('accessToken') }));
  };

  const toggleAssociatePost = (params: IFParamsId, data: IFAssociateDataRequest ) => {
    return dispatch(postStore.toggleAssociatePosts({ data, params, token: getAuth('accessToken') }));
  };

  const toggleSavesPost = (params: IFParamsId ) => {
    return dispatch(postStore.toggleSavesPost({ params, token: getAuth('accessToken') }));
  };

  const togglePinPost = (params: IFParamsId ) => {
    return dispatch(postStore.togglePinPost({ params, token: getAuth('accessToken') }));
  };

  const getTags = () => {
    return dispatch(postStore.getTags({ token: getAuth('accessToken') }));
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
    toggleSavesPost,
    togglePinPost,
    getTags
  };
};
