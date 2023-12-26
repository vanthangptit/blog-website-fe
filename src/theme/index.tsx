import React from 'react';
import { DefaultTheme, ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import {
  Colors,
  FontFamilies,
  FontSizes
} from '@src/theme/styled';

const white = '#FFFFFF';
const black = '#000000';
const futuraMedium = 'Futura-Medium, sans-serif';
const futuraLight = 'Futura-Light, sans-serif';

function colors(darkMode: boolean): Colors {
  return {
    darkMode,
    // base
    white,
    black,

    // text
    text1: darkMode ? white : black,
    text2: darkMode ? black : white,
    text3: darkMode ? black : white,

    // backgrounds / greys
    bg0: darkMode ? black : white,
    bg1: darkMode ? white : black,
    bg2: darkMode ? '#222222' : '#F9F9F9',
    bg3: darkMode ? '#222222' : '#F9F9F9',
    bg4: darkMode ? white : '#bc2e1d',

    //primary colors
    primary1: darkMode ? white : black,
    primary2: darkMode ? black : white,
    primary3: darkMode ? '#545454' : '#E4E4E4',
    primary4: darkMode ? '#7F7F7F' : '#A9A9A9',
    primary5: darkMode ? '#C8C8C8' : '#545454',

    // secondary colors
    secondary1: darkMode ? black : white,
    secondary2: darkMode ? white : black,
    secondary3: darkMode ? '#F4F4F4' : '#545454',
    secondary4: darkMode ? '#EFEFEF' : '#7F7F7F',

    inputPlaceholder: '#7F7F7F',
    colorEyes: '#9f9f9f',

    //gray colors
    gray1: '#cccccc'
  };
}

function fontSizes(): FontSizes {
  return {
    fontSizeText0: '24px',
    fontSizeText1: '20px',
    fontSizeText2: '16px',
    fontSizeText3: '14px',
    fontSizeText4: '12px',
    display1: '80px',
    display2: '64px',
    display3: '48px',
    display4: '32px',
    caps1: '36px',
    caps2: '52px'
  };
}

function fontFamilies(): FontFamilies {
  return {
    fontFuturaMedium: futuraMedium,
    fontFuturaLight: futuraLight
  };
}

export function themeMode(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),
    ...fontSizes(),
    ...fontFamilies(),
    grids: {
      sm: 8,
      md: 12,
      lg: 24
    }
  };
}

export default function ThemeProvider({
  themeObject,
  children
}: {
  themeObject: DefaultTheme
  children: React.ReactNode
}) {
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>;
}
