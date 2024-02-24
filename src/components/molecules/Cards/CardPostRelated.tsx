import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IFPost } from '@models/IFPosts';

const CardPostRelated = ({ post }: { post: IFPost }) => {
  return (
    <Box>
      <BoxLink to={`/post/${post.shortUrl}`}>
        <Titlte>{post.title}</Titlte>
        <BoxTag>
          {post.tags?.map((tag, index) => <Tag key={index}># {tag.title}</Tag>)}
        </BoxTag>
      </BoxLink>
    </Box>
  );
};

export default CardPostRelated;

const Box = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.gray2};
  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.transparent};
  }
`;

const BoxLink = styled(Link)`
  color: ${({ theme }) => theme.text1};
  &:hover {
    color: ${({ theme }) => theme.text1};
  }
`;

const Titlte = styled.span`
  display: inline-flex;
  width: 100%;
  flex: 0 0 100%;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
`;

const BoxTag = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 4px 0;
`;

const Tag = styled.span`
  display: inline-flex;
  white-space: nowrap;
  font-size: 14px;
`;
