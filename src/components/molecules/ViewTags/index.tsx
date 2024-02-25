import React from 'react';
import { Link } from 'react-router-dom';
import { IFTag } from '@models/IFTags';
import styled, { css } from 'styled-components';

const ViewTags = ({
  tags,
  margin,
  fontSize,
  isBold= false
}: {
  tags: IFTag[];
  margin?: string,
  isBold?: boolean,
  fontSize?: number
}) => {
  return (
    <Box $margin={margin}>
      {tags?.map((item, index) => (
        <BtnLink
          to={`/t/${item.title}`}
          key={index}
          $fontSize={fontSize}
          $isBold={isBold}
        >
          { '#' + item.title}
        </BtnLink>
      ))}
    </Box>
  );
};

export default ViewTags;

const Box = styled.div<{ $margin?: string }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  margin: ${({ $margin }) => $margin ?? '0'};
`;

const BtnLink = styled(Link)<{ $fontSize?: number, $isBold?: boolean }>`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  flex-wrap: nowrap;
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.transparent};
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.transparent};
  padding: 4px 8px;
  font-family: ${({ theme }) => theme.fontRobotoLight};
  &:hover {
    color: ${({ theme }) => theme.gray9};
    background-color: ${({ theme }) => theme.gray};
    border-color: ${({ theme }) => theme.gray5};
  }
  ${({ $fontSize }) =>
    $fontSize &&
    css`
      font-size: ${$fontSize}px;
  `}
  ${({ $isBold }) =>
    $isBold &&
    css`
      font-family: ${({ theme }) => theme.fontRobotoBold};
  `}
`;