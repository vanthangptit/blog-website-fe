import React from 'react';
import SiteAvatar from '@components/molecules/Avatars/SiteAvatar';
import { AVATAR_DEFAULT } from '@constants/aws/s3';
import { formatDatetimeByMonthYear } from '@utils/formatDatetime';
import { IFComment } from '@models/IFComment';
import IconButton from '@components/atoms/IconButton';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsReply } from 'react-icons/bs';

const heightAvatar = 32;

const CardComment = ({ comment }: { comment: IFComment }) => {
  const isLike = false;
  const handleLikeComment = () => true;
  const handleReplyComment = () => true;

  return (
    <Card>
      <CardBody>
        <SiteAvatar viewerPhoto={comment.user?.profilePhoto ?? AVATAR_DEFAULT} height={heightAvatar} />
        <CardContent>
          <NameLink to={'#'}>
            {comment.user.firstName + ' ' + comment.user.lastName} <b>•</b><span>{formatDatetimeByMonthYear(comment.createdAt)}</span>
          </NameLink>
          <Description>
            {comment.description}
          </Description>
        </CardContent>
      </CardBody>
      <CardFooter $paddingLeft={heightAvatar}>
        <Like onClick={handleLikeComment}>
          <IconButton
            Element={isLike ? BiSolidLike : BiLike}
            size={18}
            handleClick={() => true}
            title={'Like'}
          />
          <span>{comment.likes.length} {' '} {comment.likes.length > 1 ? 'Likes' : 'Like'}</span>
        </Like>

        <Like onClick={handleReplyComment}>
          <IconButton
            Element={BsReply}
            size={18}
            handleClick={() => true}
            title={'Reply'}
          />
          <span>Reply</span>
        </Like>
      </CardFooter>
    </Card>
  );
};

export default CardComment;

const Card = styled.div``;

const CardBody = styled.div`
  display: flex;
  gap: 5px;
`;

const CardContent = styled.div`
  flex: 1 1 auto;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.gray3};
  border-radius: 5px;
`;

const NameLink = styled(Link)`
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fontRobotoBold};
  color: ${({ theme }) => theme.text1};

  &:hover {
    color: ${({ theme }) => theme.text1};
  }

  span,
  b {
    color: ${({ theme }) => theme.gray5};
  }

  span {
    display: inline-block;
    padding-left: 5px;
    font-family: ${({ theme }) => theme.fontRobotoRegular};
    font-size: 0.875em;
  }
`;

const Description = styled.p`
  margin-top: 15px;
  font-size: 1rem;
`;

const CardFooter = styled.div<{ $paddingLeft: number }>`
  display: flex;
  gap: 25px;
  padding-left: ${({ $paddingLeft }) => $paddingLeft + 15}px;
  margin-top: 10px;
  font-size: 0.875em;
`;

const Like = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.gray2};
  }
`;
