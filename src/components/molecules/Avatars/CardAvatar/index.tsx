import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AVATAR_DEFAULT } from '@constants/aws/s3';

const CardAvatar = ({
  link,
  imageUrl,
  userName,
  createAt,
  height
}: {
  link: string;
  imageUrl?: string;
  userName: string;
  createAt: string;
  height?: number;
}) => {
  return (
    <Avatar>
      <AvatarLeft $height={height}>
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

const Avatar = styled.div`
  display: flex;
  gap: 10px;
`;

const AvatarLeft = styled.div<{ $height?: number }>`
  display: flex;
  img {
    display: flex;
    width: ${({ $height }) => $height ? $height +'px' : '45px'};
    height: ${({ $height }) => $height ? $height +'px' : '45px'};
    overflow: hidden;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const AvatarRight = styled.div``;

const AvatarName = styled.h4`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fontRobotoRegular};
  text-transform: capitalize;
  a {
    color: ${({ theme }) => theme.text4};
  }
`;

const AvatarDate = styled.span`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fontRobotoLight};
  color: ${({ theme }) => theme.text4};
`;
