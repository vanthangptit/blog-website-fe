import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

export type Icon = {
  element: IconType
  link: string
  title: string
  numberCount?: number
  state?: any
  onClick?: () => void
}

const BoxIcons = ({
  className = '',
  icons,
  size = 16
}: {
  className?: string
  icons: Icon[]
  size?: number
}) => {
  return (
    <IconsBox className={className}>
      {icons?.map((item, key) => (
        <>
          {item?.numberCount === undefined ? (
            <Icons
              key={key}
              title={item.title}
              to={item.link}
              state={item.state}
              onClick={() => item.onClick && item.onClick()}
            >
              <item.element size={size} />
            </Icons>
          ) : item?.numberCount === 0 ? (
            <></>
          ) : (
            <Icons
              $numberCount={item?.numberCount !== undefined}
              key={key}
              title={item.title}
              to={item.link}
              state={item.state}
              onClick={() => item.onClick && item.onClick()}
            >
              <item.element size={size} />
              {item?.numberCount && item.numberCount > 0 ? <span>{item.numberCount}</span> : <></>}
            </Icons>
          )}
        </>
      ))}
    </IconsBox>
  );
};

export default BoxIcons;

const IconsBox = styled.div`
  display: flex;
  gap: 12px;
`;

const Icons = styled(Link)<{ $numberCount?: boolean }>`
  background-color: ${({ theme }) => theme.bgLightOpacity};
  border-radius: 50%;
  backdrop-filter: blur(12px);
  text-align: center;
  line-height: 33px;
  border: 1px solid ${({ theme }) => theme.bgLightOpacity};
  transition: all 0.3s;

  ${({ $numberCount }) =>
    !$numberCount && css`
      display: inline-block;
      width: 30px;
      height: 30px;
      cursor: pointer;

      &:hover {
        background-color: ${({ theme }) => theme.bgDarkOpacity};
        color:  ${({ theme }) => theme.bgLightOpacity};
      }
    `}

  ${({ $numberCount }) =>
    $numberCount && css`
      display: flex;
      width: auto;
      height: 30px;
      cursor: auto;
      gap: 7px;
      align-items: center;
      padding-right: 15px;

      &:hover {
        color: inherit;;
      }
    `}
`;
