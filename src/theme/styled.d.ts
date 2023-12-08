export type Color = string
export interface Colors {
  darkMode: boolean

  // base
  white: Color
  black: Color

  // Text
  text1: Color
  text2: Color
  text3: Color

  // Backgrounds / greys
  bg0: Color
  bg1: Color
  bg2: Color
  bg3: Color
  bg4: Color

  // primaries
  primary1: Color
  primary2: Color
  primary3: Color
  primary4: Color

  // secondaries
  secondary1: Color
  secondary2: Color
  secondary3: Color
  secondary4: Color

  inputPlaceholder: Color
  colorEyes: Color
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
  fontFuturaMedium: FontFamily
  fontFuturaLight: FontFamily
}
