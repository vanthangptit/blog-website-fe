import React from 'react';
import styled from 'styled-components';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';
import CopyText from '@components/molecules/CopyText';

/**
 * @todo: Handle share link
 */
const BoxLinks = ({
  className = ''
}: {
  className?: string
}) => {
  const handleSavePost = () => {
    toasts('warn', TOAST.WARNING_UPDATING);
    return false;
  };

  return (
    <LinksBox className={className}>
      <List>
        <Item>
          <CopyText label={'Copy link'} link={window.location.href} />
        </Item>
        <Item>
          <ItemLink href="#" onClick={handleSavePost}>Share to Facebook</ItemLink>
        </Item>
        <Item>
          <ItemLink href="#" onClick={handleSavePost}>Share to LinkedIn</ItemLink>
        </Item>
        <Item>
          <ItemLink href="#" onClick={handleSavePost}>Share to Reddit</ItemLink>
        </Item>
        <Item>
          <ItemLink href="#" onClick={handleSavePost}>Report Abuse</ItemLink>
        </Item>
      </List>
    </LinksBox>
  );
};

export default BoxLinks;

const LinksBox = styled.div`
  padding: 10px;
  min-width: 230px;
  font-size: 15px;
`;

const List = styled.ul`
  list-style-position: inside;
  list-style: none;
`;

const Item = styled.li`
  white-space: nowrap;
  padding-bottom: 20px;

  &:first-child {
    padding-top: 5px;
  }

  &:last-child {
    padding-bottom: 5px;
  }
`;

const ItemLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.text1};

  &:hover {
    color: ${({ theme }) => theme.text1};
  } 

  span {
    display: inline-flex;
  }
`;
