import requester from '../requester';
import { COMMENT } from '@constants/apis';
import { IFParamsCommentRequest, IFDataCommentRequest } from '@models/IFComment';

const commentApi = {
  getCommentByPostIdApi: (params: IFParamsCommentRequest) => {
    return requester.get(`${COMMENT.URL_API}/${params.id}`);
  },
  createCommentApi: (params: IFParamsCommentRequest, data: IFDataCommentRequest) => {
    return requester.post(`${COMMENT.URL_API}/${params.id}`, data);
  },
  editCommentApi: (params: IFParamsCommentRequest, data: IFDataCommentRequest) => {
    return requester.put(`${COMMENT.URL_API}/${params.id}`, data);
  },
  deleteCommentApi: (params: IFParamsCommentRequest) => {
    return requester.delete(`${COMMENT.URL_API}/${params.id}`);
  }
};

export default commentApi;
