import styled, { css } from 'styled-components';

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

export const Container = styled.section`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;

  @media (min-width: 992px) {
    max-width: 960px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
`;

export const Column = styled.div<{
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

  ${({ $xsWidth }) =>
    $xsWidth &&
    css`
      @media (min-width: 576px) {
        flex: 0 0 ${$xsWidth};
        maxWidth: ${$xsWidth};
      }
  `}

  ${({ $smWidth }) =>
    $smWidth &&
    css`
      @media (min-width: 768px) {
        flex: 0 0 ${$smWidth};
        maxWidth: ${$smWidth};
      }
  `}

  ${({ $mdWidth }) =>
    $mdWidth &&
    css`
      @media (min-width: 992px) {
        flex: 0 0 ${$mdWidth};
        maxWidth: ${$mdWidth};
      }
  `}

  ${({ $lgWidth }) =>
    $lgWidth &&
    css`
      @media (min-width: 1200px) {
        flex: 0 0 ${$lgWidth};
        maxWidth: ${$lgWidth};
      }
  `}
`;
