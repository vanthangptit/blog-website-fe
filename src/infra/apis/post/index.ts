import requester from '../requester';
import { POST } from '@constants/apis';
import {
  IFCreatePostRequest,
  IFEditPostRequest,
  IFSinglePostRequest
} from '@models/IFPosts';

const postApi = {
  createPostApi: (data: IFCreatePostRequest) => {
    return requester.post(POST.URL_API, data);
  },
  editPostApi: ({ params, ...data }: IFEditPostRequest) => {
    return requester.put(`${POST.URL_API}/${params.shortUrl}`, data);
  },
  getSinglePostApi: (params: IFSinglePostRequest) => {
    return requester.get(`${POST.URL_API}/${params.shortUrl}`);
  }
};

export default postApi;
