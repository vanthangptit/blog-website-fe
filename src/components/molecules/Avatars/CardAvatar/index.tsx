import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AVATAR_DEFAULT } from '@constants/aws/s3';

const CardAvatar = ({
  link,
  imageUrl,
  userName,
  createAt
}: {
  link: string;
  imageUrl?: string;
  userName: string;
  createAt: string
}) => {
  return (
    <Avatar>
      <AvatarLeft>
        <Link to={link}>
          <img src={imageUrl ?? AVATAR_DEFAULT} alt="image profile" />
        </Link>

      </AvatarLeft>
      <AvatarRight>
        <AvatarName>
          <Link to={link}>{userName}</Link>
        </AvatarName>
        <AvatarDate>{createAt}</AvatarDate>
      </AvatarRight>
    </Avatar>
  );
};

export default CardAvatar;

const Avatar = styled.article`
  display: flex;
  gap: 10px;
`;

const AvatarLeft = styled.div`
  display: flex;
  
  img {
    display: flex;
    width: 45px;
    height: 45px;
    overflow: hidden;
    border-radius: 50%;
  }
`;

const AvatarRight = styled.div``;

const AvatarName = styled.h4`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fontRobotoRegular};
  color: ${({ theme }) => theme.gray6};
  text-transform: capitalize;
`;

const AvatarDate = styled.span`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fontRobotoLight};
  color: ${({ theme }) => theme.gray6};
`;
