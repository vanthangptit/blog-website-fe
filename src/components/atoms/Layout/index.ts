import styled, { css } from 'styled-components';
import styles from '@constants/styles';

export const LayoutMiddle = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.gray6};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.gray6};
  }
`;

export const Container = styled.div<{
  $xlWidth?: string
  $lgWidth?: string
  $mdWidth?: string
  $smWidth?: string
  $xsWidth?: string
  $width?: string
}>`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;

  @media (min-width: 1270px) {
    max-width: ${styles.widthContainer}px;
  }

  ${({ $smWidth }) =>
    $smWidth &&
    css`
      @media (min-width: 576px) {
        max-width: ${$smWidth};
      }
  `}

  ${({ $mdWidth }) =>
    $mdWidth &&
    css`
      @media (min-width: 768px) {
        max-width: ${$mdWidth};
      }
  `}

  ${({ $lgWidth }) =>
    $lgWidth &&
    css`
      @media (min-width: 992px) {
        max-width: ${$lgWidth};
      }
  `}

  ${({ $xsWidth }) =>
    $xsWidth &&
    css`
      @media (max-width: 576px) {
        max-width: ${$xsWidth};
      }
  `}
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
`;

export const Column = styled.div<{
  $xlWidth?: string
  $lgWidth?: string
  $mdWidth?: string
  $smWidth?: string
  $xsWidth?: string
  $width?: string
  $justify?: 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between' | 'stretch'
}>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ $justify }) => $justify};
  padding-left: 15px;
  padding-right: 15px;
  flex: 0 0 ${({ $width }) => $width ?? '100%'};
  max-width: ${({ $width }) => $width ?? '100%'};

  ${({ $smWidth }) =>
    $smWidth &&
    css`
      @media (min-width: 576px) {
        flex: 0 0 ${$smWidth};
        max-width: ${$smWidth};
      }
  `}

  ${({ $mdWidth }) =>
    $mdWidth &&
    css`
      @media (min-width: 768px) {
        flex: 0 0 ${$mdWidth};
        max-width: ${$mdWidth};
      }
  `}

  ${({ $lgWidth }) =>
    $lgWidth &&
    css`
      @media (min-width: 992px) {
        flex: 0 0 ${$lgWidth};
        max-width: ${$lgWidth};
      }
  `}

  ${({ $xlWidth }) =>
    $xlWidth &&
    css`
      @media (min-width: 1270px) {
        flex: 0 0 ${$xlWidth};
        max-width: ${$xlWidth};
      }
  `}

  ${({ $xsWidth }) =>
    $xsWidth &&
    css`
      @media (max-width: 575px) {
        flex: 0 0 ${$xsWidth};
        max-width: ${$xsWidth};
      }
  `}
`;
