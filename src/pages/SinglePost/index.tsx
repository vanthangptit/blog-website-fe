import React, { useEffect } from 'react';
import SectionTitle from '@components/molecules/Titles/SectionTitle';
import { usePosts } from '@hooks/usePost';
import { useParams } from 'react-router-dom';
import Layout174 from '@components/organisms/Layout-1-7-4';
import NotFound from '@components/molecules/NotFound';
import BannerPost from '@components/molecules/Banners/BannerPost';
import { formatDatetime, formatDatetimeByMonthYear } from '@utils/formatDatetime';
import styled from 'styled-components';
import CardAvatar from '@components/molecules/Avatars/CardAvatar';
import EscapeHTML from '@components/atoms/EscapeHTML';
import PostFormComment from '@components/molecules/Forms/PostFormComment';

const SinglePost = () => {
  const { getSinglePostApi, singlePost, isLoading } = usePosts();
  const { shortUrl } = useParams();

  useEffect(() => {
    if (shortUrl) {
      getSinglePostApi({ shortUrl });
    }
  }, [ shortUrl ]);

  return !isLoading ? (
    <>
      {singlePost?.data && (
        <Layout174 post={singlePost?.data}>
          <BoxContent>
            <CreateAt>
              {singlePost.data?.createdAt && formatDatetime(singlePost.data.createdAt)}
            </CreateAt>
            <BoxBanner>
              <BannerPost
                clickOutsideToClose={false}
                photo={singlePost.data?.imageUrl}
                alt={'Image banner Post'}
              />
            </BoxBanner>
            <CardAvatar
              link={`profile/${singlePost.data?.user?.id}`}
              imageUrl={singlePost.data?.user?.profilePhoto}
              userName={singlePost.data?.user?.fullName}
              createAt={`Posted on ${formatDatetimeByMonthYear(singlePost.data?.createdAt)}`}
            />
            {/** @todo: View likesCount, dislikesCount,... */}
            <SectionTitle title={singlePost.data?.title} />
            {/** @todo: View Tags, Category,...*/}
            <EscapeHTML htmlString={singlePost.data?.description} />
          </BoxContent>
          <BoxComment>
            <PostFormComment postId={singlePost?.data?.id} />
          </BoxComment>
        </Layout174>
      )}

      {singlePost?.statusCode && singlePost.statusCode !== 200 && (
        <NotFound message={'SORRY! THIS PAGE DOES NOT EXISTS'}/>
      )}
    </>
  ) : <div />;
};

export default SinglePost;

const CreateAt = styled.div`
  color: ${( { theme }) => theme.gray6};
  font-size: 14px;
  text-align: right;
  margin-bottom: 15px;
`;

const BoxBanner = styled.div`
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  margin-bottom: 25px;
`;

const BoxContent = styled.section`
  padding-bottom: 30px;
  border-bottom: 1px solid ${({ theme }) => theme.gray4};
`;

const BoxComment = styled.section`
  padding: 30px 0;
`;

const Description = styled.div`
  color: ${( { theme }) => theme.text3};
`;
