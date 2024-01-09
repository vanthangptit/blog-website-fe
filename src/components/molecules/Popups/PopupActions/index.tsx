import React, { useState } from 'react';
import ThreeDots from '@components/atoms/ThreeDots';
import styled, { css } from 'styled-components';
import BoxIcons, { Icon } from '@components/molecules/BoxIcons';
import { IconType } from 'react-icons';
import IconButton from '@components/atoms/IconButton';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import BoxLinks from '@components/molecules/BoxLinks';

const PopupActions = ({
  threeDot,
  boxIcons,
  iconButton,
  boxLinks
}: {
  threeDot?: {
    sizeDots?: number;
    bgDots?: string;
  },
  iconButton?: {
    sizeDots?: number;
    bgDots?: string;
    Element: IconType;
    title?: string
  },
  boxIcons?: {
    icons: Icon[],
    positionTop?: string
    positionBottom?: string
    positionLeft?: string
    positionRight?: string
  },
  boxLinks?: {
    positionTop?: string
    positionBottom?: string
    positionLeft?: string
    positionRight?: string
  }
}) => {
  const [ isShownBoxIcons, setIsShownBoxIcons ] = useState<boolean>(false);
  const showBoxIcons = () => setIsShownBoxIcons(!isShownBoxIcons);
  const userBoxNode = React.useRef<HTMLDivElement | null>(null);

  useOnClickOutside(userBoxNode, isShownBoxIcons ? showBoxIcons : undefined);

  return (
    <PopupAction ref={userBoxNode}>
      {threeDot && (
        <ThreeDots size={threeDot?.sizeDots ?? 22} handleClick={showBoxIcons} bg={threeDot?.bgDots} />
      )}

      {iconButton && (
        <IconButton Element={iconButton.Element} size={iconButton?.sizeDots ?? 22} handleClick={showBoxIcons} title={iconButton?.title}/>
      )}

      {boxIcons && isShownBoxIcons && (
        <BoxIcon
          icons={boxIcons.icons}
          $left={boxIcons?.positionLeft}
          $right={boxIcons?.positionRight}
          $top={boxIcons?.positionTop}
          $bottom={boxIcons?.positionBottom}
        />
      )}

      {boxLinks && isShownBoxIcons && (
        <BoxLink
          $left={boxLinks?.positionLeft}
          $right={boxLinks?.positionRight}
          $top={boxLinks?.positionTop}
          $bottom={boxLinks?.positionBottom}
        />
      )}
    </PopupAction>
  );
};

export default PopupActions;

const PopupAction = styled.div`
  position: relative;
  display: inline-flex;
`;

const BoxIcon = styled(BoxIcons)<{ $left?: string, $right?: string, $top?: string, $bottom?: string }>`
  gap: 5px;
  z-index: 2;
  position: absolute;
  background-color: ${({ theme }) => theme.bg0};
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 5px;
  padding: 10px;

  ${({ $top }) =>
    $top && css`
      top: ${$top};
    `}

  ${({ $bottom }) =>
    $bottom && css`
      bottom: ${$bottom};
    `}

  ${({ $left }) =>
    $left && css`
      left: ${$left};
    `}

  ${({ $right }) =>
    $right && css`
      right: ${$right};
    `}

  ${({ $left, $right }) =>
    !$left && !$right &&
    css`
      left: 0;
  `}

  ${({ $top, $bottom }) =>
    !$top && !$bottom &&
    css`
      top: 0;
  `}
`;

const BoxLink = styled(BoxLinks)<{ $left?: string, $right?: string, $top?: string, $bottom?: string }>`
  gap: 5px;
  z-index: 2;
  position: absolute;
  background-color: ${({ theme }) => theme.bg0};
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 5px;
  padding: 10px;

  ${({ $top }) =>
    $top && css`
      top: ${$top};
    `}

  ${({ $bottom }) =>
    $bottom && css`
      bottom: ${$bottom};
    `}

  ${({ $left }) =>
    $left && css`
      left: ${$left};
    `}

  ${({ $right }) =>
    $right && css`
      right: ${$right};
    `}

  ${({ $left, $right }) =>
    !$left && !$right &&
    css`
      left: 0;
  `}

  ${({ $top, $bottom }) =>
    !$top && !$bottom &&
    css`
      top: 0;
  `}
`;
