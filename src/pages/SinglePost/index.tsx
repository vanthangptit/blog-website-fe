import React, { useEffect, useState } from 'react';
import { usePosts } from '@hooks/usePost';
import { useParams } from 'react-router-dom';
import Layout174 from '@components/organisms/Layout-1-7-4';
import NotFound from '@components/molecules/NotFound';
import BannerPost from '@components/molecules/Banners/BannerPost';
import { formatDatetime } from '@utils/formatDatetime';
import styled from 'styled-components';
import EscapeHTML from '@components/atoms/EscapeHTML/DivEscapeHTML';
import PostFormComment from '@components/molecules/Forms/PostFormComment';
import {
  BiDislike,
  BiHeart,
  BiLike,
  BiStar
} from 'react-icons/bi';
import BoxIcons from '@components/molecules/BoxIcons';
import CardAvatar from '@components/molecules/Avatars/CardAvatar';
import TitlePage from '@components/molecules/Titles/TitlePage';
import { useUser } from '@hooks/useUser';
import ViewTags from '@components/molecules/ViewTags';

const SinglePost = () => {
  const { getSinglePostApi, singlePost } = usePosts();
  const { profile } = useUser();
  const { shortUrl } = useParams();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  useEffect(() => {
    if (shortUrl) {
      setIsLoading(true);
      getSinglePostApi({ shortUrl }).unwrap().then(() => setIsLoading(false));
    }
  }, [ shortUrl ]);

  const listIcons = [
    {
      element: BiLike,
      title: 'Like',
      link: '#',
      numberCount: singlePost?.data ? singlePost?.data.singlePost.likesCount : 0,
      onClick: () => false
    },
    {
      element: BiDislike,
      title: 'Dislike',
      link: '#',
      numberCount: singlePost?.data ? singlePost?.data.singlePost.disLikesCount : 0,
      onClick: () => false
    },
    {
      element: BiHeart,
      title: 'Heart',
      link: '#',
      numberCount: singlePost?.data ? singlePost?.data.singlePost.heartsCount : 0,
      onClick: () => false
    },
    {
      element: BiStar,
      title: 'Star',
      link: '#',
      numberCount: singlePost?.data ? singlePost?.data.singlePost.starsCount : 0,
      onClick: () => false
    }
  ];

  return !isLoading ? (
    <>
      {singlePost?.data && singlePost?.data?.singlePost && (
        <Layout174
          post={singlePost?.data.singlePost}
          postRelated={singlePost?.data?.postRelated}
          creator={singlePost.data.singlePost.creator}
          user={profile?.data}
        >
          <BoxContent>
            <BoxContentTop>
              <CardAvatar
                link={`/user/${singlePost.data?.singlePost.creator.id}`}
                imageUrl={singlePost.data?.singlePost.creator?.profilePhoto}
                userName={singlePost.data?.singlePost.creator?.fullName}
                createAt={`Posted on ${formatDatetime(singlePost.data.singlePost.createdAt) + ' (GMT+7)'}`}
              />
            </BoxContentTop>
            {singlePost.data?.singlePost.imageUrl && (
              <BoxBanner>
                <BannerPost
                  clickOutsideToClose={false}
                  photo={singlePost.data?.singlePost.imageUrl}
                  alt={'Image banner Post'}
                />
              </BoxBanner>
            )}
            <BoxAssociates>
              <BoxIcons icons={listIcons} size={25} />
            </BoxAssociates>
            <TitlePage title={singlePost.data?.singlePost.title} margin={'20px 0 10px'} />
            <ViewTags tags={singlePost.data?.singlePost.tags} margin={'0 0 30px'} />
            <EscapeHTML htmlString={singlePost.data?.singlePost.description} />
          </BoxContent>
          <BoxComment>
            <PostFormComment postId={singlePost?.data?.singlePost.id} viewer={profile?.data} />
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
