import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

export type Icon = {
  element: IconType
  link: string
  title: string
  state?: any
  onClick?: () => void
}

const BoxIcons = ({
  className = '',
  icons
}: {
  className?: string
  icons: Icon[]
}) => {
  return (
    <IconsBox className={className}>
      {icons?.map((item, key) => {
        return (
          <Icons
            key={key}
            title={item.title}
            to={item.link}
            state={item.state}
            onClick={() => item.onClick && item.onClick()}
          >
            <item.element size={16} />
          </Icons>
        );
      })}
    </IconsBox>
  );
};

export default BoxIcons;

const IconsBox = styled.div`
  display: flex;
  gap: 12px;
`;

const Icons = styled(Link)`
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.bgLightOpacity};
  border-radius: 50%;
  backdrop-filter: blur(12px);
  text-align: center;
  line-height: 33px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.bgLightOpacity};
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.bgDarkOpacity};
    color:  ${({ theme }) => theme.bgLightOpacity};
  }
`;
