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
  IFSinglePostRequest
} from '@models/IFPosts';

export const usePosts = () => {
  const dispatch = useAppDispatch();
  const postsStates = useAppSelector((state: RootState) => state.posts);

  const createPostApi = (params: IFCreatePostRequest) => {
    return dispatch(postStore.createPostApi(params));
  };

  const editPostApi = (params: IFEditPostRequest) => {
    return dispatch(postStore.editPostApi(params));
  };

  const getSinglePostApi = (params: IFSinglePostRequest) => {
    return dispatch(postStore.getSinglePostApi(params));
  };

  const getAllPost = () => {
    return dispatch(postStore.getAllPost());
  };

  const deletePost = (params: IFDeletePostRequest) => {
    return dispatch(postStore.deletePost(params));
  };

  return {
    ...postsStates,
    createPostApi,
    editPostApi,
    getSinglePostApi,
    getAllPost,
    deletePost
  };
};
