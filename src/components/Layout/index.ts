import styled from 'styled-components';
import { heightFooter } from '@constants/footer';

export const LayoutMiddle = styled('div')<{ styles?: any }>(({ styles }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflowX: 'hidden',
  overflowY: 'auto',
  height: `calc(100vh - ${heightFooter}px)`,
  minHeight: `calc(575px + ${heightFooter}px)`,

  ...(styles && { ...styles }),

  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px'
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#555555',
    borderRadius: '5px'
  },

  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555555'
  }
}));

export const Layout = styled('div')<{ styles?: any, paddingNav?: boolean, scrollBar?: boolean, flexMiddle?: boolean }>(({ styles, paddingNav, scrollBar, flexMiddle }) => ({
  ...(styles && { ...styles }),

  ...(paddingNav && {
    paddingLeft: '16px',

    '@media (min-width: 1200px)': {
      paddingLeft: 16 + 'px'
    }
  }),

  ...(scrollBar && {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    paddingRight: '16px',

    '&::-webkit-scrollbar': {
      width: '6px',
      height: '6px'
    },

    '&::-webkit-scrollbar-thumb': {
      background: '#555555',
      borderRadius: '5px'
    },

    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555555'
    }
  }),

  ...(flexMiddle && {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  })
}));

export const CustomContainer = styled('div')<{ styles?: any, flexMiddle?: boolean }>(({ styles, flexMiddle }) => ({
  width: '100%',
  marginRight: 'auto',
  marginLeft: 'auto',

  ...(!styles?.padding && {
    paddingRight: '15px',
    paddingLeft: '15px'
  }),

  ...(styles && { ...styles }),

  ...(flexMiddle && {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),

  ...(!styles?.maxWidth && {
    '@media (min-width: 992px)': {
      maxWidth: '960px'
    }
  })
}));

export const CustomRow = styled('div')<{ styles?: any }>(({ styles }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginRight: '-15px',
  marginLeft: '-15px',

  ...(styles && { ...styles })
}));

export const CustomColumn = styled('div')<{
  lgWidth?: string
  mdWidth?: string
  smWidth?: string
  xsWidth?: string
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between' | 'stretch'
}>(({
  lgWidth,
  mdWidth,
  smWidth,
  xsWidth,
  justify
}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: `${justify}`,
  paddingLeft: '15px',
  paddingRight: '15px',
  flex: '0 0 100%',
  maxWidth: '100%',

  ...(xsWidth && {
    '@media (min-width: 576px)': {
      flex: `${xsWidth && `0 0 ${xsWidth}`}`,
      maxWidth: `${xsWidth}`
    }
  }),

  ...(smWidth && {
    '@media (min-width: 768px)': {
      flex: `${smWidth && `0 0 ${smWidth}`}`,
      maxWidth: `${smWidth}`
    }
  }),

  ...(mdWidth && {
    '@media (min-width: 992px)': {
      flex: `${mdWidth && `0 0 ${mdWidth}`}`,
      maxWidth: `${mdWidth}`
    }
  }),

  ...(lgWidth && {
    '@media (min-width: 1200px)': {
      flex: `${lgWidth && `0 0 ${lgWidth}`}`,
      maxWidth: `${lgWidth}`
    }
  })
}));
