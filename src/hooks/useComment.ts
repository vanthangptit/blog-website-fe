import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';
import * as commentStore from '@store/comment';
import { IFParamsPostIdComment, IFDataComment } from '@models/IFComment';
import { useAuth } from '@hooks/useAuth';

export const useComment = () => {
  const dispatch = useAppDispatch();
  const { getAuth } = useAuth();

  const commentsStates = useAppSelector((state: RootState) => state.comment);

  const getCommentByPostId = (params: IFParamsPostIdComment) => {
    return dispatch(commentStore.getCommentByPostId({ params, token: getAuth('accessToken') }));
  };

  const createComment = (params: IFParamsPostIdComment, data: IFDataComment) => {
    return dispatch(commentStore.createComment({ params, data, token: getAuth('accessToken') }));
  };

  const editComment = (params: IFParamsPostIdComment, data: IFDataComment) => {
    return dispatch(commentStore.editComment({ params, data, token: getAuth('accessToken') }));
  };

  const deleteComment = (params: IFParamsPostIdComment) => {
    return dispatch(commentStore.deleteComment({ params, token: getAuth('accessToken') }));
  };

  return {
    ...commentsStates,
    createComment,
    editComment,
    deleteComment,
    getCommentByPostId
  };
};
