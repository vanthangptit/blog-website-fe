import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { formatDatetimePostCreated } from '@utils/formatDatetime';
import CardAvatar from '@components/molecules/Avatars/CardAvatar';
import { IFPost } from '@models/IFPosts';
import ViewTags from '@components/molecules/ViewTags';
import { FaRegBookmark } from 'react-icons/fa';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';

const spacing = 40;

const CardPostAtHome = ({ post, margin }: { post: IFPost; margin?: string }) => {
  const [ reactions, setReactions ] = useState<number>(0);

  useEffect(() => {
    let count = 0;
    if (post.disLikesCount > 0) {
      count = count + post.disLikesCount;
    }
    if (post.likesCount > 0) {
      count = count + post.likesCount;
    }
    if (post.heartsCount > 0) {
      count = count + post.heartsCount;
    }
    if (post.starsCount > 0) {
      count = count + post.starsCount;
    }
    setReactions(count);
  }, [ post ]);

  const savePost = () => toasts('warn', TOAST.WARNING_UPDATING);

  return (
    <Box $margin={margin}>
      <CardAvatar
        height={spacing}
        link={`/user/${post.creator.id}`}
        imageUrl={post.creator?.profilePhoto}
        userName={post.creator?.fullName}
        createAt={`${formatDatetimePostCreated(post.createdAt) + ' (GMT+7)'}`}
      />
      <BoxContent $paddingLeft={spacing}>
        <BoxHeading>{post.title}</BoxHeading>
        <ViewTags tags={post.tags} margin={'0 -8px'} fontSize={13} />
        <BoxContentBottom>
          {reactions > 0 && (
            <Reaction>
              {reactions === 1 ? '1 Reaction' : `${reactions} Reactions`}
            </Reaction>
          )}
          <Reaction>11 Reactions</Reaction>
          <CardBottomColumn>
            <CardBottomRead>{post.daysAgo}</CardBottomRead>
            <CardBottomSave>
              <FaRegBookmark size={16} onClick={savePost}/>
            </CardBottomSave>
          </CardBottomColumn>
        </BoxContentBottom>
      </BoxContent>
    </Box>
  );
};

export default CardPostAtHome;

const Box = styled.div<{ $margin?: string }>`
  padding: 15px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.gray3};
  ${({ $margin }) =>
    $margin &&
    css`
      margin: ${$margin};
    `}
`;

const BoxContentBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0 0;
`;

const Reaction = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.gray6};
`;

const BoxHeading = styled.h4`
  font-size: 18px;
  @media (min-width: 768px) {
    font-size: 24px;
  }
  color: ${({ theme }) => theme.primary1};
`;

const BoxContent = styled.div<{ $paddingLeft: number }>`
  margin-top: 7px;
  padding-left: ${({ $paddingLeft }) => $paddingLeft + 10 + 'px'};
`;

const CardBottomColumn = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  color: ${({ theme }) => theme.primary1};
`;

const CardBottomSave = styled.span`
  cursor: pointer;
  display: inline-flex;
`;

const CardBottomRead = styled.small`
  color: ${({ theme }) => theme.gray6};
`;