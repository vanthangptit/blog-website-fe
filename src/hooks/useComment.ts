import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';
import * as commentStore from '@store/comment';
import { IFParamsCommentRequest, IFDataCommentRequest } from '@models/IFComment';

export const useComment = () => {
  const dispatch = useAppDispatch();
  const commentsStates = useAppSelector((state: RootState) => state.comment);

  const getCommentByPostId = (params: IFParamsCommentRequest) => {
    return dispatch(commentStore.getCommentByPostId(params));
  };

  const createComment = (params: IFParamsCommentRequest, data: IFDataCommentRequest) => {
    return dispatch(commentStore.createComment({ params, data }));
  };

  const editComment = (params: IFParamsCommentRequest, data: IFDataCommentRequest) => {
    return dispatch(commentStore.editComment({ params, data }));
  };

  const deleteComment = (params: IFParamsCommentRequest) => {
    return dispatch(commentStore.deleteComment(params));
  };

  return {
    ...commentsStates,
    createComment,
    editComment,
    deleteComment,
    getCommentByPostId
  };
};
