import React from 'react';
import styled from 'styled-components';

/**
 * @todo: Handle share link
 */
const BoxLinks = ({
  className = ''
}: {
  className?: string
}) => {
  return (
    <LinksBox className={className}>
      <List>
        <Item>
          <a href="#" onClick={() => false}>Copy link</a>
        </Item>
        <Item><
          a href="#" onClick={() => false}>Share to Facebook</a>
        </Item>
        <Item>
          <a href="#" onClick={() => false}>Share to LinkedIn</a>
        </Item>
        <Item>
          <a href="#" onClick={() => false}>Share to Reddit</a>
        </Item>
        <Item>
          <a href="#" onClick={() => false}>Report Abuse</a>
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
  padding-bottom: 15px;

  &:first-child {
    padding-top: 5px;
  }

  &:last-child {
    padding-bottom: 5px;
  }
`;
