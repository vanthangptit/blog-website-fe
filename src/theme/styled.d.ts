export type Color = string
export interface Colors {
  darkMode: boolean

  // base
  white: Color
  black: Color

  // Text
  text1: Color
  text2: Color

  // Backgrounds / greys
  bg0: Color
  bg1: Color
  bg2: Color
  bg3: Color
  bgDarkOpacity: Color
  bgLightOpacity: Color
  bgBoxShadow: Color

  // primaries
  primary1: Color
  primary2: Color
  primary3: Color
  primary4: Color
  primary5: Color

  // secondaries
  secondary1: Color
  secondary2: Color
  secondary3: Color
  secondary4: Color

  inputPlaceholder: Color
  colorEyes: Color

  gray: Color,
  gray1: Color,
  gray2: Color,
  gray3: Color,
  gray4: Color,
  gray5: Color,
  gray6: Color,
  gray7: Color,
  gray8: Color,
  gray9: Color
}

export type FontSize = string
export interface FontSizes {
  fontSizeText0: FontSize
  fontSizeText1: FontSize
  fontSizeText2: FontSize
  fontSizeText3: FontSize
  fontSizeText4: FontSize
  display1: FontSize
  display2: FontSize
  display3: FontSize
  display4: FontSize
  caps1: FontSize
  caps2: FontSize
}

export type FontFamily = string
export interface FontFamilies {
  fontRobotoLight: FontFamily
  fontRobotoRegular: FontFamily
  fontRobotoBold: FontFamily
  fontRobotoBlack: FontFamily
  fontMuktaMalarSemiBold: FontFamily,
  fontMuktaMalarBold: FontFamily,
  fontMuktaMalarExtraBold: FontFamily
}
