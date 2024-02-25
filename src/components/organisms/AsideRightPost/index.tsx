import React, { useContext } from 'react';
import styled from 'styled-components';
import CardAvatar from '@components/molecules/Avatars/CardAvatar';
import Button from '@components/molecules/Buttons/ButtonPrimary';
import { formatDatetimeByMonthYear } from '@utils/formatDatetime';
import { IUser } from '@models/IFUser';
import { IFPost } from '@models/IFPosts';
import SectionTitleH4 from '@components/molecules/Titles/SectionTitleH4';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@hooks/useUser';
import { usePosts } from '@hooks/usePost';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';
import { IFResponse } from '@models/IFResponse';
import { UnauthorizedContext } from '@infra/context/UnauthorizedContext';
import CardPostRelated from '@components/molecules/Cards/CardPostRelated';

const AsideRightPost = ({
  shortUrl,
  creator,
  user,
  postRelated
}: {
  shortUrl: string,
  creator: IUser,
  user?: IUser,
  postRelated?: IFPost[]
}) => {
  const navigate = useNavigate();
  const { followingApi, unFollowApi } = useUser();
  const { getSinglePostApi } = usePosts();
  const { setUnauthorized } = useContext(UnauthorizedContext);

  const handleResponse = (response: IFResponse) => {
    if (response.status === 200 || response?.statusCode === 200) {
      getSinglePostApi({ shortUrl });
    } else if (response.status === 400 || response?.statusCode === 400) {
      toasts('error', response?.message);
    } else {
      toasts('error', TOAST.ERROR_COMMON);
    }
  };

  const handleFollow = () => {
    if (user) {
      followingApi({ userId: creator._id })
        .unwrap()
        .then(handleResponse);
    } else {
      setUnauthorized(true);
    }
  };

  const handleUnFollow = () => {
    if (user) {
      unFollowApi({ userId: creator._id })
        .unwrap()
        .then(handleResponse);
    } else {
      setUnauthorized(true);
    }
  };

  return (
    <AsideRight>
      {user && user?._id === creator._id ? (
        <ButtonEdit>
          <Button
            size={'sm'}
            text={'Edit Post'}
            buttonType={'button'}
            handleClick={() => navigate(`/edit-post/${shortUrl}`)}
          />
        </ButtonEdit>
      ) : (
        <>
          <Box>
            <BoxProfile>
              <CardAvatar
                link={`/user/${creator.id}`}
                imageUrl={creator?.profilePhoto}
                userName={creator?.fullName}
                createAt={`Joined on ${formatDatetimeByMonthYear(creator.createdAt)}`}
              />

              <Button
                size={'sm'}
                text={creator.followers?.indexOf(user?._id ?? '') > -1 ? 'Unfollow' : 'Follow'}
                buttonType={'button'}
                handleClick={creator.followers?.indexOf(user?._id ?? '') > -1 ? handleUnFollow : handleFollow}
              />
            </BoxProfile>

            {creator?.description && (
              <UserInfo>{creator?.description}</UserInfo>
            )}

            {(creator?.address || creator?.job) && (
              <UserInfo>
                {creator?.address && (
                  <SectionTitleH4
                    title={'Location'}
                    des={creator?.address}
                  />
                )}
                {creator?.job && (
                  <SectionTitleH4
                    title={'Work'}
                    des={creator?.job}
                  />
                )}
              </UserInfo>
            )}
          </Box>
        </>
      )}

      <Box>
        <BoxPostsRelated>
          <h3>
            {user?._id !== creator._id ? (
              <>
                More from <Link to={`/user/${creator.id}`} style={{ color: '#bc2e1d' }}>{creator?.fullName}</Link>
              </>
            ) : (
              'More posts related'
            )}
          </h3>
          {postRelated && postRelated.length > 0 ? (
            <PostsRelatedCard>
              {postRelated?.map((post, index) => <CardPostRelated post={post} key={index} />)}
            </PostsRelatedCard>
          ) : (
            <PostsRelatedCard>Have not post related</PostsRelatedCard>
          )}
        </BoxPostsRelated>
      </Box>
    </AsideRight>
  );
};

export default React.memo(AsideRightPost);

const AsideRight = styled.div`
  width: 100%;
`;

const Box = styled.div`
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.gray3};
  margin-bottom: 25px;
`;

const UserInfo = styled.div`
  margin: 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.text4};
`;

const BoxProfile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  padding: 15px;
  background-color: ${({ theme }) => theme.gray3};
`;

const ButtonEdit = styled.div`
  margin: 30px 0 25px;

  @media (max-width: 767px) {
    display: none;
  }
`;

const BoxPostsRelated = styled.div`
  h3 {
    padding: 15px;
    background-color: ${({ theme }) => theme.gray3};
  }
`;

const PostsRelatedCard = styled.div`
  width: 100%;
`;
