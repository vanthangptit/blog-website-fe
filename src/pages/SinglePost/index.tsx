import React, { useEffect } from 'react';
import SectionTitle from '@components/molecules/Titles/SectionTitle';
import { usePosts } from '@hooks/usePost';
import { useParams } from 'react-router-dom';
import Layout174 from '@components/organisms/Layout-1-7-4';
import NotFound from '@components/molecules/NotFound';
import BannerPost from '@components/molecules/Banners/BannerPost';
import { formatDatetime } from '@utils/formatDatetime';
import styled from 'styled-components';
import EscapeHTML from '@components/atoms/EscapeHTML';
import PostFormComment from '@components/molecules/Forms/PostFormComment';
import {
  BiDislike,
  BiHeart,
  BiLike,
  BiStar
} from 'react-icons/bi';
import BoxIcons from '@components/molecules/BoxIcons';
import CardAvatar from '@components/molecules/Avatars/CardAvatar';

const SinglePost = () => {
  const { getSinglePostApi, singlePost, isLoading } = usePosts();
  const { shortUrl } = useParams();

  useEffect(() => {
    if (shortUrl) {
      getSinglePostApi({ shortUrl });
    }
  }, [ shortUrl ]);

  const listIcons = [
    {
      element: BiLike,
      title: 'Like',
      link: '#',
      numberCount: singlePost?.data ? singlePost?.data.likesCount : 0,
      onClick: () => false
    },
    {
      element: BiDislike,
      title: 'Dislike',
      link: '#',
      numberCount: singlePost?.data ? singlePost?.data.disLikesCount : 0,
      onClick: () => false
    },
    {
      element: BiHeart,
      title: 'Heart',
      link: '#',
      numberCount: singlePost?.data ? singlePost?.data.heartsCount : 0,
      onClick: () => false
    },
    {
      element: BiStar,
      title: 'Star',
      link: '#',
      numberCount: singlePost?.data ? singlePost?.data.starsCount : 0,
      onClick: () => false
    }
  ];

  return !isLoading ? (
    <>
      {singlePost?.data && (
        <Layout174 post={singlePost?.data} postRelated={singlePost?.data} creator={singlePost.data.user}>
          <BoxContent>
            <BoxContentTop>
              <CardAvatar
                link={`/profile/${singlePost.data?.user.id}`}
                imageUrl={singlePost.data?.user?.profilePhoto}
                userName={singlePost.data?.user?.fullName}
                createAt={`Posted on ${formatDatetime(singlePost.data.createdAt) + ' (GMT+7)'}`}
              />
            </BoxContentTop>
            {singlePost.data?.imageUrl && (
              <BoxBanner>
                <BannerPost
                  clickOutsideToClose={false}
                  photo={singlePost.data?.imageUrl}
                  alt={'Image banner Post'}
                />
              </BoxBanner>
            )}
            <BoxAssociates>
              <BoxIcons icons={listIcons} size={25} />
            </BoxAssociates>
            <SectionTitle title={singlePost.data?.title} />
            {/** @todo: View Tags, Category,...*/}
            <EscapeHTML htmlString={singlePost.data?.description} Element={Description}/>
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

const BoxAssociates = styled.div``;

const BoxContentTop = styled.div`
  display: flex;
  padding: 20px 0;
  justify-content: space-between;
`;

const CreateAt = styled.div`
  color: ${( { theme }) => theme.gray6};
  font-size: 14px;
  text-align: right;
  margin-bottom: 15px;
`;

const BoxBanner = styled.div`
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  margin-bottom: 10px;
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
